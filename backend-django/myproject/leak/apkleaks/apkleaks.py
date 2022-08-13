#!/usr/bin/env python3
from myproject.leak.apkleaks.colors import color as col
from myproject.leak.apkleaks.utils import util
from distutils.spawn import find_executable
from urllib.request import urlopen
from  db.models import  Rule
from pyaxmlparser import APK
from pathlib import Path
from pathlib import Path
from pipes import quote
import logging.config
import threading
import shutil
import sys
import os
import re


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent


class APKLeaks:
	def __init__(self, fileName):
		self.fileName = fileName
		self.apk = None
		self.disarg = None
		self.out_json = {}
		self.scanned = False
		self.file = os.path.realpath(fileName)
		self.tempdir = os.path.realpath("tempfiles")
		self.main_dir = os.path.dirname(os.path.realpath(__file__))
		logging.config.dictConfig({"version": 1, "disable_existing_loggers": True})
		self.jadx = find_executable("jadx") if find_executable("jadx") is not None else os.path.join(str(Path(self.main_dir).parent), "jadx", "bin", "jadx%s" % (".bat" if os.name == "nt" else ".sh")).replace("\\","/")

	def apk_info(self):
		return APK(self.file)

	def dependencies(self):
		pass

	def integrity(self):
		
		if os.path.isfile(self.file):
			try:
				self.apk = self.apk_info()
			except Exception as error:
				util.writeln(str(error), col.WARNING)
				sys.exit()
			else:
				print("self.file",self.file)

				return self.apk
		else:
			sys.exit(util.writeln("It's not a valid file!", col.WARNING))

	def decompile(self):
		util.writeln("** Decompiling APK...", col.OKBLUE)
		args = [self.jadx , self.file, "-d", self.tempdir]
		try:
			args.extend(re.split(r"\s|=", self.disarg))
		except Exception:
			pass
		comm = "%s" % (" ".join(quote(arg) for arg in args))
		comm = comm.replace("\'","\"")

		print("comm",comm)
		os.system(comm)

	def extract(self, name, matches):
		if len(matches):
			stdout = ("[%s]" % (name))
			util.writeln("\n" + stdout, col.OKGREEN)
			self.out_json["results"].append({"name": name, "matches": matches})
			self.scanned = True

	def scanning(self):
		if self.apk is None:
			sys.exit(util.writeln("** Undefined package. Exit!", col.FAIL))
		util.writeln("\n** Scanning against '%s'" % (self.apk.package), col.OKBLUE)
		
		self.out_json["package"] = self.apk.package
		self.out_json["results"] = []

		rules = Rule.objects.all()
		for rule in rules :
			try:
				thread = threading.Thread(target = self.extract, args = (rule.title, util.finder(rule.Regex, self.tempdir)))
				thread.start()
			except KeyboardInterrupt:
				sys.exit(util.writeln("\n** Interrupted. Aborting...", col.FAIL))

		self

	def cleanup(self):
		files = os.path.join(self.tempdir)
		
		for filename in os.listdir(files):
			file_path = os.path.join(files, filename)
			try:
				if os.path.isfile(file_path) or os.path.islink(file_path):
					os.unlink(file_path)
				elif os.path.isdir(file_path):
					shutil.rmtree(file_path)
			except Exception as e:
				print('Failed to delete %s. Reason: %s' % (file_path, e))


	def getFinalResult(self):
		androidData = {}
		androidData["app_name"] = self.apk.get_app_name()
		androidData["libraries"] = self.apk.get_libraries()
		androidData["activities"] = self.apk.get_activities()
		androidData["permissions"] = self.apk.get_permissions()
		androidData["get_signatures"] = self.apk.get_signature_names()
		androidData["androidversion_code"] = self.apk.get_androidversion_code()
		androidData["androidversion_name"] = self.apk.get_androidversion_name()
		androidData["receivers"] = self.apk.get_receivers()
		androidData["get_filename"] = self.fileName

		# apkf = APK("myfile.apk")
    	# apkf = APK(read("myfile.apk"), raw=True)

		return [self.out_json,androidData]
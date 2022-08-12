#!/usr/bin/env python3
import io
import json
import logging.config
import os
import re
import shutil
import sys
import tempfile
import threading
from  db.models import  Rule
import glob
from contextlib import closing
from distutils.spawn import find_executable
from pathlib import Path
from pipes import quote
from urllib.request import urlopen
from zipfile import ZipFile

from pyaxmlparser import APK

from myproject.leak.apkleaks.colors import color as col
from myproject.leak.apkleaks.utils import util
from pathlib import Path


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent


class APKLeaks:
	def __init__(self, fileName):
		self.apk = None
		self.file = os.path.realpath(fileName)
		# self.json = True
		self.disarg = None
		# self.prefix = "apkleaks-"
		self.tempdir = os.path.realpath("tempfiles")
		self.main_dir = os.path.dirname(os.path.realpath(__file__))
		# self.output = tempfile.mkstemp(suffix=".%s" % ("json" if self.json else "txt"), prefix=self.prefix)[1] if None is None else None
		# self.fileout = open(self.output, "%s" % ("w" if self.json else "a"))
		# self.pattern = os.path.join(str(Path(self.main_dir).parent), "config", "regexes.json") if None is None else None
		self.jadx = find_executable("jadx") if find_executable("jadx") is not None else os.path.join(str(Path(self.main_dir).parent), "jadx", "bin", "jadx%s" % (".bat" if os.name == "nt" else ".sh")).replace("\\","/")
		self.out_json = {}
		self.scanned = False
		self.aaa = None
		self.test = []
		logging.config.dictConfig({"version": 1, "disable_existing_loggers": True})

	def apk_info(self):
		return APK(self.file)

	def dependencies(self):
		pass
		# exter = "https://github.com/skylot/jadx/releases/download/v1.2.0/jadx-1.2.0.zip"
		# try:
		# 	with closing(urlopen(exter)) as jadx:
		# 		with ZipFile(io.BytesIO(jadx.read())) as zfile:
		# 			zfile.extractall(os.path.join(str(Path(self.main_dir).parent), "jadx"))
		# 	os.chmod(self.jadx, 33268)
		# except Exception as error:
		# 	util.writeln(str(error), col.WARNING)
		# 	sys.exit()

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
			# self.fileout.write("%s" % (stdout + "\n" if self.json is False else ""))
			# for secret in matches:
			# 	if name == "LinkFinder":
			# 		if re.match(r"^.(L[a-z]|application|audio|fonts|image|kotlin|layout|multipart|plain|text|video).*\/.+", secret) is not None:
			# 			continue
			# 		secret = secret[len("'"):-len("'")]
			# 	stdout = ("- %s" % (secret))
			# 	# print(stdout)
			# 	self.fileout.write("%s" % (stdout + "\n" if self.json is False else ""))
			# self.fileout.write("%s" % ("\n" if self.json is False else ""))
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

			# regex = json.load(regexes)
			# for name, pattern in regex.items():
			# 	if isinstance(pattern,list):
			# 		for p in pattern:
			# 			try:
			# 				thread = threading.Thread(target = self.extract, args = (name, util.finder(p, self.tempdir)))
			# 				thread.start()
			# 			except KeyboardInterrupt:
			# 				sys.exit(util.writeln("\n** Interrupted. Aborting...", col.FAIL))
			# 	else:
			# 		try:
			# 			thread = threading.Thread(target = self.extract, args = (name, util.finder(pattern, self.tempdir)))
			# 			thread.start()
			# 		except KeyboardInterrupt:
			# 			sys.exit(util.writeln("\n** Interrupted. Aborting...", col.FAIL))
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
		# shutil.rmtree(self.tempdir)
		# os.makedirs(self.tempdir)
		# shutil.rmtree(self.tempdir)
		# if self.scanned:
		# 	self.fileout.write("%s" % (json.dumps(self.out_json, indent=4) if self.json else ""))
		# 	self.fileout.close()
		# 	print("%s\n** Results saved into '%s%s%s%s'%s." % (col.HEADER, col.ENDC, col.OKGREEN, self.output, col.HEADER, col.ENDC))
		# else:
		# 	self.fileout.close()
		# 	os.remove(self.output)
		# 	util.writeln("\n** Done with nothing. ¯\\_(ツ)_/¯", col.WARNING)
	def getFinalResult(self):
		# print("A",self.out_json)
		return self.out_json
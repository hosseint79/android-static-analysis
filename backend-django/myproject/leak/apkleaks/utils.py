#!/usr/bin/env python3
import os
import re
import sys
from myproject.leak.apkleaks.colors import color as col

class util:
	@staticmethod
	def write(message, color):
		sys.stdout.write("%s%s%s" % (color, message, col.ENDC))

	@staticmethod
	def writeln(message, color):
		util.write(message + "\n", color)

	@staticmethod
	def finder(pattern, path):
		print(pattern)
		matcher = re.compile(pattern)
		found = []
		for fp, _, files in os.walk(path):
				for fn in files:
					filepath = os.path.join(fp, fn)
					if "\sources" in filepath or "/sources" in filepath:

						with open(filepath) as handle:
							try:
								for line in handle.readlines():
									mo = matcher.search(line)
									if mo:
										f = {}
										f["value"] = mo.group()
										f["path"] = "sources" + filepath.split("sources")[1]

										found.append(f)



							except Exception:
								pass
		# return sorted(list(set(found)))
		return found

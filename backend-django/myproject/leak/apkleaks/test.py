

from distutils.spawn import find_executable

import os
from pathlib import Path
from pipes import quote


BASE_DIR = Path(__file__).resolve().parent.parent
ff = find_executable("jadx") if find_executable("jadx") is not None else os.path.join(str(Path(os.path.dirname(os.path.realpath(__file__))).parent), "jadx", "bin", "jadx%s" % (".bat" if os.name == "nt" else "")).replace("\\","/")
args = [ff,
        os.path.realpath("files/co.pooneh.mimt (2).apk"),
        "-d",
        os.path.join(BASE_DIR,"tempfiles")]

comm = "%s" % (" ".join(quote(arg) for arg in args))
comm = comm.replace("\'","\"")

print("************8",comm)
os.system(comm)
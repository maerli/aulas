from directory import Directory
from provas import Provas

def get_directory(parentId):
	return list(Directory.select().where(Directory.parentId == parentId).dicts())
def add_directory(args):
	Directory.create(**args)


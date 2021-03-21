from directory import Directory

class Api:
    def __init__(self):
        pass
    def reload(self):
        from shell import shell
        command = shell('npm run dev')
        for i in command.output():
            print(i)
        pass
        #js = jsx.transform('index.jsx',js_path="index.js")
    def message(self):
        return list(Directory.select().order_by(Directory.id.desc()).dicts())
    def add(self,name):
        Directory.create(parentId=1,name=name,type='$')
        return "ok"

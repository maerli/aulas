import webview
import api
myapi = api.Api()
from shell import shell
#./aulas/build/index.html
window = webview.create_window('Make Aulas','./web/index.html', js_api=myapi)
def evaluate(window):
    pass

webview.start(evaluate, window,debug=True)

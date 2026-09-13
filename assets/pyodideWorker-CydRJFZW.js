async function e(e,t,n){e.globals.set(`_nexus_stdin_readline_async`,t),e.globals.set(`_nexus_flush_stdout_async`,async()=>{await n?.()}),await e.runPythonAsync(`
import builtins
from pyodide.ffi import run_sync

def _nexus_input(prompt=""):
    prompt_str = "" if prompt is None else str(prompt)
    if prompt_str:
        print(prompt_str, end="")
    line = run_sync(_nexus_stdin_readline_async())
    if line is None:
        raise EOFError("EOF when reading a line")
    return line

builtins.input = _nexus_input
`)}const t=/^(IndentationError|SyntaxError|NameError|TypeError|ValueError|IndexError|KeyError|AttributeError|ZeroDivisionError|RuntimeError|ImportError|ModuleNotFoundError|EOFError)(?::\s*(.*))?$/;function n(e){let n=e.trim(),r=n.match(/File "([^"]+)", line (\d+)/),i=r?.[1]??null,a=r?Number(r[2]):null,o=a!=null&&Number.isFinite(a)&&a>=1?a:null,s=`Error`,c=n;for(let e of n.split(`
`)){let n=e.trim().match(t);if(n){s=n[1],c=n[2]?.trim()||s;break}}c===n&&n.includes(`PythonError`)&&(n.includes(`OSError`)&&/I\/O error/i.test(n)?(s=`InputError`,c=`Program called input() without a response. Press Run, then type each answer in the output panel when prompted.`):c=`Python execution failed`);let l=o?`Line ${o}: ${s}: ${c}`:`${s}: ${c}`;return{file:i,line:o,kind:s,message:c,summary:l}}function r(e){return e.trim().split(`
`).filter(e=>e.trim()!==`PythonError`).join(`
`).trim()||e.trim()}function i(e){let t=new Int32Array(e,0,4);Atomics.store(t,0,0)}function a(e,t){let n=new Int32Array(e,0,4),r=new Uint8Array(e,16,4096),i=new TextDecoder,a=Date.now()+t;for(;Date.now()<a;){if(Atomics.load(n,0)===1){let e=n[1];return Atomics.store(n,0,0),i.decode(r.subarray(0,e)).replace(/\r?\n$/,``)}let e=a-Date.now();if(e<=0)break;Atomics.wait(n,0,0,Math.min(e,50))}return null}const o=`https://cdn.jsdelivr.net/pyodide/v0.27.7/full/`;let s=null,c=null,l=!1,u=null;function d(e,t){self.postMessage({type:`output`,text:e,outputType:t})}function f(e){self.postMessage({type:`status`,status:e})}function p(){l=!1}function m(){u&&=(u(null),null)}function h(){if(!s)return``;try{return s.runPython(`_stdout_cap.getvalue()`)||``}catch{return``}}function g(){if(s)try{s.runPython(`_stdout_cap.clear()`)}catch{}}function _(){let e=h();e&&(d(e,`stdout`),g())}async function v(){_()}async function y(){let e=h();g();let t=e,n=e.lastIndexOf(`
`);n!==-1&&(d(e.slice(0,n+1),`stdout`),t=e.slice(n+1)),l||(l=!0,self.postMessage({type:`stdin-wait`,prompt:t}));try{return c?a(c,6e5):await new Promise(e=>{u=e})}finally{l=!1}}function b(e){if(u){let t=u;u=null,l=!1,t(e)}}async function x(){if(s)return s;d(`Loading Python runtime (Pyodide)…`,`system`),f(`loading`);try{let{loadPyodide:t}=await import(`${o}pyodide.mjs`);return s=await t({indexURL:o}),await s.loadPackage(`micropip`),await s.runPythonAsync(`import micropip
import sys
import io`),await e(s,y,v),d(`Python 3.12 ready (Pyodide). Press Run — input() prompts appear in the output panel as your program runs.`,`success`),f(`ready`),self.postMessage({type:`ready`}),s}catch(e){throw d(`Failed to load Python runtime: ${e instanceof Error?e.message:String(e)}`,`stderr`),f(`error`),s=null,e}}async function S(t,a){let o=await x();p(),m(),c&&i(c),f(`running`),await e(o,y,v);try{await o.runPythonAsync(`
import sys, io as _io

class _Capture:
    def __init__(self, kind):
        self._buf = []
        self._kind = kind
    def write(self, text):
        self._buf.append(text)
    def flush(self): pass
    def getvalue(self):
        return ''.join(self._buf)
    def clear(self):
        self._buf.clear()

_stdout_cap = _Capture('stdout')
_stderr_cap = _Capture('stderr')
sys.stdout = _stdout_cap
sys.stderr = _stderr_cap
`);try{await o.loadPackagesFromImports(t)}catch{}await o.runPythonAsync(t,{filename:a});let e=await o.runPythonAsync(`_stdout_cap.getvalue()`),n=await o.runPythonAsync(`_stderr_cap.getvalue()`);e&&d(e,`stdout`),n&&d(n,`stderr`),!e&&!n&&d(`(no output)`,`info`)}catch(e){let t=r(await o.runPythonAsync(`_stderr_cap.getvalue()`).catch(()=>``)||(e instanceof Error?e.message:String(e)));d(t,`stderr`),self.postMessage({type:`run-error`,formatted:t,error:n(t)})}finally{await o.runPythonAsync(`sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__`).catch(()=>{}),self.postMessage({type:`stdin-idle`}),p(),m(),f(`ready`)}}async function C(e){let t=await x();f(`running`),d(`Installing ${e}…`,`info`);try{await t.runPythonAsync(`
import micropip
await micropip.install('${e.replace(/'/g,`\\'`)}')
print("Installed: ${e.replace(/'/g,`\\'`)}")
`),d(`Successfully installed ${e}`,`success`)}catch(t){d(`Failed to install ${e}: ${t}`,`stderr`)}finally{f(`ready`)}}async function w(t,n){let r=await x();p(),await e(r,y,v);try{await r.runPythonAsync(`
import sys, io as _io

class _Capture:
    def __init__(self):
        self._buf = []
    def write(self, text):
        self._buf.append(text)
    def flush(self): pass
    def getvalue(self):
        return ''.join(self._buf)
    def clear(self):
        self._buf.clear()

_stdout_cap = _Capture()
_stderr_cap = _Capture()
sys.stdout = _stdout_cap
sys.stderr = _stderr_cap
`);try{await r.loadPackagesFromImports(t)}catch{}let e=`
try:
    _result = eval(${JSON.stringify(t)})
    if _result is not None:
        print(repr(_result))
except SyntaxError:
    exec(${JSON.stringify(t)}, globals())
`;await r.runPythonAsync(e);let i=await r.runPythonAsync(`_stdout_cap.getvalue()`),a=await r.runPythonAsync(`_stderr_cap.getvalue()`);self.postMessage({type:`eval-result`,requestId:n,stdout:i.trimEnd(),stderr:a.trimEnd()})}catch(e){let t=await r.runPythonAsync(`_stderr_cap.getvalue()`).catch(()=>``),i=String(e instanceof Error?e.message:e);self.postMessage({type:`eval-result`,requestId:n,stdout:``,stderr:(t+i).trim()})}finally{await r.runPythonAsync(`sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__`).catch(()=>{}),self.postMessage({type:`stdin-idle`}),p(),m(),f(`ready`)}}let T=Promise.resolve();function E(e){T=T.then(e).catch(e=>{d(String(e instanceof Error?e.message:e),`stderr`),f(`ready`),self.postMessage({type:`stdin-idle`}),m()})}self.onmessage=e=>{let t=e.data;if(t.type===`bind-stdin`&&t.sab){c=t.sab;return}if(t.type===`stdin-line`&&t.line!=null){b(t.line);return}E(async()=>{switch(t.type){case`init`:await x();break;case`run`:t.code!=null&&await S(t.code,t.filename??`main.py`);break;case`install`:t.pkg&&await C(t.pkg);break;case`eval`:t.code!=null&&t.requestId!=null&&await w(t.code,t.requestId);break;default:break}})};
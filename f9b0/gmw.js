(self.webpackChunkgb_printer_web=self.webpackChunkgb_printer_web||[]).push([[340],{99981:function(t,e,n){"use strict";n.r(e),n.d(e,{init:function(){return C},middleware:function(){return E}});n(41539),n(88674),n(32564),n(83710),n(92222),n(24812);var r=n(25009),o=n.n(r),i=(n(91058),n(66992),n(78783),n(33948),n(21249),n(69826),n(19601),n(68309),n(74916),n(4723),n(82772),n(68304),n(30489),n(12419),n(78011),n(69070),n(47941),n(82526),n(57327),n(38880),n(89554),n(54747),n(49337),n(33321),n(79753),n(41817),n(32165),n(91038),n(47042),n(17187)),a=n.n(i),u=n(79546),c=n(27484),s=n.n(c),l=n(67508);function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t){return function(t){if(Array.isArray(t))return h(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){y(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=j(t);if(e){var o=j(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return O(this,n)}}function O(t,e){return!e||"object"!==f(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function j(t){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var S,T=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(i,t);var e,n,r,o=w(i);function i(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return g(this,i),(t=o.call(this)).octoKit=null,t.busy=!1,t.owner=null,t.repo=null,t.branch=null,t.throttle=null,t.token=null,t.progress=0,t.queueLength=0,t.addToQueue=n,t.setOctokit(e),t}return e=i,(n=[{key:"setOctokit",value:function(t){var e=t.use,n=t.owner,r=t.repo,o=t.branch,i=t.throttle,a=t.token;if(this.busy||!e||!n||!r||!o||!i||!a)return this.octoKit=null,this.owner=null,this.repo=null,this.branch=null,this.throttle=null,void(this.token=null);this.owner=n,this.repo=r,this.branch=o,this.throttle=Math.max(parseInt(i,10)||0,10),this.token=a,this.octoKit=new u.v({auth:a})}},{key:"progressStart",value:function(t){this.queueLength=t+7,this.emit("starting",{progress:0,queueLength:this.queueLength}),this.progressTick()}},{key:"progressTick",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.progress=t?0:this.progress+1,this.emit("progress",{progress:this.progress,queueLength:this.queueLength}),t&&(this.queueLength=0)}},{key:"getRepoContents",value:function(){var t=this;this.progressTick();var e=[{path:"images",value:[]},{path:"frames",value:[]},{path:"settings.json",value:{}}];return this.addToQueue("repos.getContent /",this.throttle,(function(){return t.octoKit.repos.getContent({owner:t.owner,repo:t.repo,ref:"heads/".concat(t.branch),path:""})})).then((function(n){var r=n.data;return Promise.all(e.map((function(e){var n=e.path,o=e.value;return r.find((function(t){return t.path===n}))?t.addToQueue("repos.getContent /".concat(n),t.throttle,(function(){return t.octoKit.repos.getContent({owner:t.owner,repo:t.repo,ref:"heads/".concat(t.branch),path:n})})).then((function(t){var e=t.data;return{path:n,value:"file"===e.type?JSON.parse(atob(e.content)):e}})).catch((function(){return{path:n,value:o}})):Promise.resolve({path:n,value:o})}))).then((function(e){return{images:t.augmentFileList("images",e.find((function(t){return"images"===t.path})).value),frames:t.augmentFileList("frames",e.find((function(t){return"frames"===t.path})).value),settings:e.find((function(t){return"settings.json"===t.path})).value}}))}))}},{key:"augmentFileList",value:function(t,e){var n=this;return e.map((function(r,o){var i=d(d({},r),{},{getFileContent:function(){return n.getFileContent(r.sha,o,e.length)}});switch(t){case"images":return Object.assign(i,{hash:r.name.substr(0,40)});case"frames":return Object.assign(i,{id:r.name.match(/^[a-z]+[0-9]+/gi)[0]});default:return i}}))}},{key:"getFileContent",value:function(t,e,n){var r=this;return this.progressTick(),this.addToQueue("git.getBlob (".concat(e+1,"/").concat(n,") ").concat(t),this.throttle,(function(){return r.octoKit.git.getBlob({owner:r.owner,repo:r.repo,file_sha:t})})).then((function(t){var e=t.data.content;return atob(e)}))}},{key:"getCurrentCommit",value:function(){var t=this;return this.progressTick(),this.addToQueue("git.getRef heads/".concat(this.branch),this.throttle,(function(){return t.octoKit.git.getRef({owner:t.owner,repo:t.repo,ref:"heads/".concat(t.branch)})})).then((function(e){var n=e.data.object.sha;return t.addToQueue("git.getCommit ".concat(n),t.throttle,(function(){return t.octoKit.git.getCommit({owner:t.owner,repo:t.repo,commit_sha:n})})).then((function(t){var e=t.data;return{commitSha:n,treeSha:e.tree.sha}}))}))}},{key:"createBlobForFile",value:function(t,e,n){var r=this,o=t.destination,i=t.blob;return this.progressTick(),new Promise((function(t){var e=new FileReader;e.onloadend=function(e){var n=e.target;t(n.result)},e.readAsDataURL(i)})).then((function(t){var i=t.indexOf(";base64,")+8,a=t.substr(i);return r.addToQueue("git.createBlob (".concat(e+1,"/").concat(n,") ").concat(o),r.throttle,(function(){return r.octoKit.git.createBlob({owner:r.owner,repo:r.repo,content:a,encoding:"base64"})})).then((function(t){var e=t.data;return{filename:o,blobData:e}}))}))}},{key:"createNewTree",value:function(t,e){var n=this,r=t.files,o=t.del;this.progressTick();var i=r.map((function(t){return{path:t.filename,mode:"100644",type:"blob",sha:t.blobData.sha}})),a=o.map((function(t){return{path:t.path,mode:"100644",sha:null}}));return this.addToQueue("git.createTree ".concat(e),this.throttle,(function(){return n.octoKit.git.createTree({owner:n.owner,repo:n.repo,tree:[].concat(p(i),p(a)),base_tree:e})})).then((function(t){return t.data}))}},{key:"createNewCommit",value:function(t,e,n){var r=this;return this.progressTick(),this.addToQueue("git.createCommit ".concat(t),this.throttle,(function(){return r.octoKit.git.createCommit({owner:r.owner,repo:r.repo,message:t,tree:e,parents:[n]})})).then((function(t){return t.data}))}},{key:"setBranchToCommit",value:function(t){var e=this;return this.progressTick(),this.addToQueue("git.updateRef ".concat(t),this.throttle,(function(){return e.octoKit.git.updateRef({owner:e.owner,repo:e.repo,ref:"heads/".concat(e.branch),sha:t})})).then((function(t){return t.data}))}},{key:"uploadToRepo",value:function(t){var e=this,n=t.upload,r=t.del;if(!this.octoKit)return Promise.reject(new Error("OctoClient not configured"));var o="Sync. ".concat(s()().format(l.W4)),i=n.length;return this.getCurrentCommit().then((function(t){var a=t.treeSha,u=t.commitSha;return Promise.all(n.map((function(t,n){return e.createBlobForFile(t,n,i)}))).then((function(t){return e.createNewTree({files:t,del:r},a)})).then((function(t){var n=t.sha;return e.createNewCommit(o,n,u)})).then((function(t){var n=t.sha;return e.setBranchToCommit(n)}))}))}},{key:"updateRemoteStore",value:function(t){var e=this,n=t.upload,r=void 0===n?[]:n,o=t.del,i=void 0===o?[]:o;return this.busy?Promise.reject(Error("currently busy")):r.length||i.length?(this.progressStart(r.length),this.busy=!0,this.uploadToRepo({upload:r,del:i}).then((function(){return e.progressTick(!0),e.busy=!1,{uploaded:r.map((function(t){return t.destination})),deleted:i.map((function(t){return t.path})),repo:"https://github.com/".concat(e.owner,"/").concat(e.repo,"/tree/").concat(e.branch)}})).catch((function(t){throw e.busy=!1,e.emit("error",t),t}))):Promise.resolve({})}}])&&b(e.prototype,n),r&&b(e,r),i}(a()),A=n(28433),k=n(42855),P=n(25108),R=function(){},C=function(t){var e=t.getState().gitStorage,n=new(o())(1,1/0);S=new T(e,(R=function(e){return function(r,o,i){return n.add((function(){return new Promise((function(n,a){window.setTimeout((function(){t.dispatch({type:"GITSTORAGE_LOG_ACTION",payload:{timestamp:(new Date).getTime()/1e3,message:"".concat(e," runs ").concat(r)}}),i().then(n).catch(a)}),o)}))}))}})("OctoClient"))},E=function(t){return function(e){"STORAGE_SYNC_START"===e.type&&"git"===e.payload.storageType?S.getRepoContents().then((function(n){switch(e.payload.direction){case"up":return(0,A.Z)(t,n,R("GBPrinter")).then(S.updateRemoteStore.bind(S));case"down":return(0,k.Z)(n).then((function(e){return t.dispatch({type:"GIT_SETTINGS_IMPORT",payload:n.settings}),e}));default:return Promise.reject(new Error("github sync: wrong sync case"))}})).then((function(e){t.dispatch({type:"STORAGE_SYNC_DONE",payload:{syncResult:e,storageType:"git"}})})).catch((function(e){P.error(e),t.dispatch({type:"ERROR",payload:e.message})})):"SET_GIT_STORAGE"===e.type&&S.setOctokit(e.payload)}}},28433:function(t,e,n){"use strict";n.d(e,{Z:function(){return w}});n(21249),n(57327),n(69826),n(68309),n(74916),n(4723),n(66992),n(41539),n(88674),n(78783),n(33948),n(92222),n(69070),n(47941),n(82526),n(38880),n(89554),n(54747),n(49337),n(33321),n(79753),n(41817),n(32165),n(91038),n(47042);var r=n(70440),o=n(7309),i=n(70954),a=n(7199);n(82772);function u(t){return function(t){if(Array.isArray(t))return c(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var s=function(t,e,n,r){var o=t.images,i=t.frames;return{upload:e.filter((function(t){var e=t.destination;return!o.find((function(t){return t.path===e}))&&!i.find((function(t){return t.path===e}))})),del:[].concat(u(u(o).filter((function(t){var o=t.path;return!n.find((function(t){var e=t.destination;return o===e}))&&!e.find((function(t){var e=t.destination;return o===e}))&&!r.find((function(t){return o.indexOf(t)>=-1}))}))),u(u(i).filter((function(t){var r=t.path;return!n.find((function(t){var e=t.destination;return r===e}))&&!e.find((function(t){var e=t.destination;return r===e}))}))))}},l=(n(23123),n(69600),n(85953)),f=n(25108);function p(t){return function(t){if(Array.isArray(t))return h(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var m=function(t){var e=(0,l.Z)(t);return function(t){var n=[],r=[],o={};t.forEach((function(t){var e=t.hash,i=t.files,a=t.inRepo;r.push.apply(r,p(a.map((function(t){var e=t.path,n=e.split("/")[0];return o[n]=o[n]?o[n]+1:1,{destination:e}})))),n.push.apply(n,p(i.map((function(t){var n=t.blob,r=t.folder,i=function(t){switch(t){case"image/png":return"png";case"image/jpg":case"image/jpeg":return"jpg";case"image/webp":return"webp";case"text/plain":return"txt";case"text/markdown":return"md";case"application/json":case"text/json":return"json";default:return f.warn('unknown file extension for type "'.concat(t,'"')),"none"}}(n.type),a=r||i;return o[a]=o[a]?o[a]+1:1,{destination:"".concat(a,"/").concat(e,".").concat(i),blob:n}}))))}));var i=["## Files in this repo:"].concat(p(Object.keys(o).map((function(t){return" * ".concat(t,": [").concat(o[t],"](/").concat(t,")")})))).join("\n");return e("remote").then((function(t){return n.push({destination:"README.md",blob:new Blob(p(i),{type:"text/plain"})},{destination:"settings.json",blob:new Blob(p(t),{type:"application/json"})}),{toUpload:n.filter(Boolean),toKeep:r.filter(Boolean)}}))}};function d(t){return function(t){if(Array.isArray(t))return y(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function g(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function b(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(Object(n),!0).forEach((function(e){v(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function v(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var w=function(t,e,n){var u=t.getState(),c=(0,r.Z)(b(b({},u),{},{exportScaleFactors:[1],exportFileTypes:["txt"],handleExportFrame:"keep"})),l=m(t),f=[],p=u.images.filter((function(t){return!t.hashes})).map((function(t){return b(b({},t),{},{inRepo:[e.images.find((function(e){return e.name.substr(0,40)===t.hash}))].filter(Boolean)})})),h=p.length,y=u.frames.map((function(t){return b(b({},t),{},{inRepo:[e.frames.find((function(e){return e.name.match(/^[a-z]+[0-9]+/gi)[0]===t.id}))].filter(Boolean)})})),g=y.length;return Promise.all([].concat(d(p.map((function(t,e){return t.inRepo.length?b(b({},t),{},{inRepo:t.inRepo,files:[]}):n("loadImageTiles (".concat(e+1,"/").concat(h,") ").concat(t.title),3,(function(){return(0,o.Z)(u)(t,!0).then((function(e){return e.length?c((0,i.Z)(u,t),t)(e).then((function(e){return b(b({},t),{},{files:e})})):(f.push(t.hash),Promise.resolve(null))}))}))}))),d(y.map((function(t,e){return t.inRepo.length?b(b({},t),{},{inRepo:t.inRepo,files:[]}):n("loadFrameData (".concat(e+1,"/").concat(g,") ").concat(t.id),3,(function(){return(0,a.v)(t.id).then((function(e){return b(b({},t),{},{hash:t.id,files:[{folder:"frames",filename:"",blob:new Blob(new Array(JSON.stringify(e||"{}",null,2)),{type:"application/json"}),title:t.name}]})}))}))}))))).then((function(t){return l(t.filter(Boolean))})).then((function(t){var n=t.toUpload,r=t.toKeep;return s(e,n,r,f)}))}},42855:function(t,e,n){"use strict";n(66992),n(41539),n(88674),n(78783),n(33948),n(92222),n(21249),n(57327),n(74916),n(23123),n(4723),n(69600),n(43290),n(84944),n(79753),n(82526),n(41817),n(32165),n(91038),n(47042),n(68309);var r=n(20260),o=n(7199);function i(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}e.Z=function(t){var e=t.images,n=t.frames,a=e.length,u=n.length;return Promise.all([].concat(i(e.map((function(t,e){return(0,r.zD)(t.hash,null,!0).then((function(n){return n.length?t.hash:t.getFileContent(t.sha,e,a).then((function(t){var e=t.split("\n").filter((function(t){return t.match(/^[0-9a-f ]+$/gi)}));return(0,r.a1)(e)}))}))}))),i(n.map((function(t,e){return(0,o.v)(t.id).then((function(n){return n?t.id:t.getFileContent(t.sha,e,u).then((function(e){var n=JSON.parse(e,null,2),r=Array(32).fill("f").join(""),a=Array(16).fill(r),u=[].concat(i(n.upper),i(Array(14).fill().map((function(t,e){return[].concat(i(n.left[e]),i(a),i(n.right[e]))})).flat()),i(n.lower));return(0,o.e)(t.id,u)}))}))})))))}}}]);
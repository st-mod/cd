var n={d:(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n)},e={};n.d(e,{CD:()=>ot,W7:()=>tt,aC:()=>j,cd:()=>et,ib:()=>K,Zg:()=>Q,rY:()=>B,in:()=>q,$U:()=>X,AY:()=>nt});const{abs:o,cos:i,sin:r,acos:s,atan2:c,sqrt:l,pow:a}=Math;function u(t){return t<0?-a(-t,1/3):a(t,1/3)}const h=Math.PI,p=2*h,f=h/2,y=Number.MAX_SAFE_INTEGER||9007199254740991,x=Number.MIN_SAFE_INTEGER||-9007199254740991,d={x:0,y:0,z:0},g={Tvalues:[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,-.9951872199970213,.9951872199970213],Cvalues:[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872],arcfn:function(t,n){const e=n(t);let o=e.x*e.x+e.y*e.y;return void 0!==e.z&&(o+=e.z*e.z),l(o)},compute:function(t,n,e){if(0===t)return n[0].t=0,n[0];const o=n.length-1;if(1===t)return n[o].t=1,n[o];const i=1-t;let r=n;if(0===o)return n[0].t=t,n[0];if(1===o){const n={x:i*r[0].x+t*r[1].x,y:i*r[0].y+t*r[1].y,t};return e&&(n.z=i*r[0].z+t*r[1].z),n}if(o<4){let n,s,c,l=i*i,a=t*t,u=0;2===o?(r=[r[0],r[1],r[2],d],n=l,s=i*t*2,c=a):3===o&&(n=l*i,s=l*t*3,c=i*a*3,u=t*a);const h={x:n*r[0].x+s*r[1].x+c*r[2].x+u*r[3].x,y:n*r[0].y+s*r[1].y+c*r[2].y+u*r[3].y,t};return e&&(h.z=n*r[0].z+s*r[1].z+c*r[2].z+u*r[3].z),h}const s=JSON.parse(JSON.stringify(n));for(;s.length>1;){for(let n=0;n<s.length-1;n++)s[n]={x:s[n].x+(s[n+1].x-s[n].x)*t,y:s[n].y+(s[n+1].y-s[n].y)*t},void 0!==s[n].z&&(s[n]=s[n].z+(s[n+1].z-s[n].z)*t);s.splice(s.length-1,1)}return s[0].t=t,s[0]},computeWithRatios:function(t,n,e,o){const i=1-t,r=e,s=n;let c,l=r[0],a=r[1],u=r[2],h=r[3];return l*=i,a*=t,2===s.length?(c=l+a,{x:(l*s[0].x+a*s[1].x)/c,y:(l*s[0].y+a*s[1].y)/c,z:!!o&&(l*s[0].z+a*s[1].z)/c,t}):(l*=i,a*=2*i,u*=t*t,3===s.length?(c=l+a+u,{x:(l*s[0].x+a*s[1].x+u*s[2].x)/c,y:(l*s[0].y+a*s[1].y+u*s[2].y)/c,z:!!o&&(l*s[0].z+a*s[1].z+u*s[2].z)/c,t}):(l*=i,a*=1.5*i,u*=3*i,h*=t*t*t,4===s.length?(c=l+a+u+h,{x:(l*s[0].x+a*s[1].x+u*s[2].x+h*s[3].x)/c,y:(l*s[0].y+a*s[1].y+u*s[2].y+h*s[3].y)/c,z:!!o&&(l*s[0].z+a*s[1].z+u*s[2].z+h*s[3].z)/c,t}):void 0))},derive:function(t,n){const e=[];for(let o=t,i=o.length,r=i-1;i>1;i--,r--){const t=[];for(let e,i=0;i<r;i++)e={x:r*(o[i+1].x-o[i].x),y:r*(o[i+1].y-o[i].y)},n&&(e.z=r*(o[i+1].z-o[i].z)),t.push(e);e.push(t),o=t}return e},between:function(t,n,e){return n<=t&&t<=e||g.approximately(t,n)||g.approximately(t,e)},approximately:function(t,n,e){return o(t-n)<=(e||1e-6)},length:function(t){const n=g.Tvalues.length;let e=0;for(let o,i=0;i<n;i++)o=.5*g.Tvalues[i]+.5,e+=g.Cvalues[i]*g.arcfn(o,t);return.5*e},map:function(t,n,e,o,i){return o+(t-n)/(e-n)*(i-o)},lerp:function(t,n,e){const o={x:n.x+t*(e.x-n.x),y:n.y+t*(e.y-n.y)};return void 0!==n.z&&void 0!==e.z&&(o.z=n.z+t*(e.z-n.z)),o},pointToString:function(t){let n=t.x+"/"+t.y;return void 0!==t.z&&(n+="/"+t.z),n},pointsToString:function(t){return"["+t.map(g.pointToString).join(", ")+"]"},copy:function(t){return JSON.parse(JSON.stringify(t))},angle:function(t,n,e){const o=n.x-t.x,i=n.y-t.y,r=e.x-t.x,s=e.y-t.y;return c(o*s-i*r,o*r+i*s)},round:function(t,n){const e=""+t,o=e.indexOf(".");return parseFloat(e.substring(0,o+1+n))},dist:function(t,n){const e=t.x-n.x,o=t.y-n.y;return l(e*e+o*o)},closest:function(t,n){let e,o,i=a(2,63);return t.forEach((function(t,r){o=g.dist(n,t),o<i&&(i=o,e=r)})),{mdist:i,mpos:e}},abcratio:function(t,n){if(2!==n&&3!==n)return!1;if(void 0===t)t=.5;else if(0===t||1===t)return t;const e=a(t,n)+a(1-t,n);return o((e-1)/e)},projectionratio:function(t,n){if(2!==n&&3!==n)return!1;if(void 0===t)t=.5;else if(0===t||1===t)return t;const e=a(1-t,n);return e/(a(t,n)+e)},lli8:function(t,n,e,o,i,r,s,c){const l=(t-e)*(r-c)-(n-o)*(i-s);return 0!=l&&{x:((t*o-n*e)*(i-s)-(t-e)*(i*c-r*s))/l,y:((t*o-n*e)*(r-c)-(n-o)*(i*c-r*s))/l}},lli4:function(t,n,e,o){const i=t.x,r=t.y,s=n.x,c=n.y,l=e.x,a=e.y,u=o.x,h=o.y;return g.lli8(i,r,s,c,l,a,u,h)},lli:function(t,n){return g.lli4(t,t.c,n,n.c)},makeline:function(t,n){const e=t.x,o=t.y,i=n.x,r=n.y,s=(i-e)/3,c=(r-o)/3;return new A(e,o,e+s,o+c,e+2*s,o+2*c,i,r)},findbbox:function(t){let n=y,e=y,o=x,i=x;return t.forEach((function(t){const r=t.bbox();n>r.x.min&&(n=r.x.min),e>r.y.min&&(e=r.y.min),o<r.x.max&&(o=r.x.max),i<r.y.max&&(i=r.y.max)})),{x:{min:n,mid:(n+o)/2,max:o,size:o-n},y:{min:e,mid:(e+i)/2,max:i,size:i-e}}},shapeintersections:function(t,n,e,o,i){if(!g.bboxoverlap(n,o))return[];const r=[],s=[t.startcap,t.forward,t.back,t.endcap],c=[e.startcap,e.forward,e.back,e.endcap];return s.forEach((function(n){n.virtual||c.forEach((function(o){if(o.virtual)return;const s=n.intersects(o,i);s.length>0&&(s.c1=n,s.c2=o,s.s1=t,s.s2=e,r.push(s))}))})),r},makeshape:function(t,n,e){const o=n.points.length,i=t.points.length,r=g.makeline(n.points[o-1],t.points[0]),s=g.makeline(t.points[i-1],n.points[0]),c={startcap:r,forward:t,back:n,endcap:s,bbox:g.findbbox([r,t,n,s]),intersections:function(t){return g.shapeintersections(c,c.bbox,t,t.bbox,e)}};return c},getminmax:function(t,n,e){if(!e)return{min:0,max:0};let o,i,r=y,s=x;-1===e.indexOf(0)&&(e=[0].concat(e)),-1===e.indexOf(1)&&e.push(1);for(let c=0,l=e.length;c<l;c++)o=e[c],i=t.get(o),i[n]<r&&(r=i[n]),i[n]>s&&(s=i[n]);return{min:r,mid:(r+s)/2,max:s,size:s-r}},align:function(t,n){const e=n.p1.x,o=n.p1.y,s=-c(n.p2.y-o,n.p2.x-e);return t.map((function(t){return{x:(t.x-e)*i(s)-(t.y-o)*r(s),y:(t.x-e)*r(s)+(t.y-o)*i(s)}}))},roots:function(t,n){n=n||{p1:{x:0,y:0},p2:{x:1,y:0}};const e=t.length-1,o=g.align(t,n),r=function(t){return 0<=t&&t<=1};if(2===e){const t=o[0].y,n=o[1].y,e=o[2].y,i=t-2*n+e;if(0!==i){const o=-l(n*n-t*e),s=-t+n;return[-(o+s)/i,-(-o+s)/i].filter(r)}return n!==e&&0===i?[(2*n-e)/(2*n-2*e)].filter(r):[]}const c=o[0].y,a=o[1].y,h=o[2].y;let f=3*a-c-3*h+o[3].y,y=3*c-6*a+3*h,x=-3*c+3*a,d=c;if(g.approximately(f,0)){if(g.approximately(y,0))return g.approximately(x,0)?[]:[-d/x].filter(r);const t=l(x*x-4*y*d),n=2*y;return[(t-x)/n,(-x-t)/n].filter(r)}y/=f,x/=f,d/=f;const m=(3*x-y*y)/3,w=m/3,b=(2*y*y*y-9*y*x+27*d)/27,v=b/2,z=v*v+w*w*w;let _,k,S,E,A;if(z<0){const t=-m/3,n=l(t*t*t),e=-b/(2*n),o=s(e<-1?-1:e>1?1:e),c=2*u(n);return S=c*i(o/3)-y/3,E=c*i((o+p)/3)-y/3,A=c*i((o+2*p)/3)-y/3,[S,E,A].filter(r)}if(0===z)return _=v<0?u(-v):-u(v),S=2*_-y/3,E=-_-y/3,[S,E].filter(r);{const t=l(z);return _=u(-v+t),k=u(v+t),[_-k-y/3].filter(r)}},droots:function(t){if(3===t.length){const n=t[0],e=t[1],o=t[2],i=n-2*e+o;if(0!==i){const t=-l(e*e-n*o),r=-n+e;return[-(t+r)/i,-(-t+r)/i]}return e!==o&&0===i?[(2*e-o)/(2*(e-o))]:[]}if(2===t.length){const n=t[0],e=t[1];return n!==e?[n/(n-e)]:[]}return[]},curvature:function(t,n,e,i,r){let s,c,u,h,p=0,f=0;const y=g.compute(t,n),x=g.compute(t,e),d=y.x*y.x+y.y*y.y;if(i?(s=l(a(y.y*x.z-x.y*y.z,2)+a(y.z*x.x-x.z*y.x,2)+a(y.x*x.y-x.x*y.y,2)),c=a(d+y.z*y.z,1.5)):(s=y.x*x.y-y.y*x.x,c=a(d,1.5)),0===s||0===c)return{k:0,r:0};if(p=s/c,f=c/s,!r){const r=g.curvature(t-.001,n,e,i,!0).k,s=g.curvature(t+.001,n,e,i,!0).k;h=(s-p+(p-r))/2,u=(o(s-p)+o(p-r))/2}return{k:p,r:f,dk:h,adk:u}},inflections:function(t){if(t.length<4)return[];const n=g.align(t,{p1:t[0],p2:t.slice(-1)[0]}),e=n[2].x*n[1].y,o=n[3].x*n[1].y,i=n[1].x*n[2].y,r=18*(-3*e+2*o+3*i-n[3].x*n[2].y),s=18*(3*e-o-3*i),c=18*(i-e);if(g.approximately(r,0)){if(!g.approximately(s,0)){let t=-c/s;if(0<=t&&t<=1)return[t]}return[]}const l=s*s-4*r*c,a=Math.sqrt(l),u=2*r;return g.approximately(u,0)?[]:[(a-s)/u,-(s+a)/u].filter((function(t){return 0<=t&&t<=1}))},bboxoverlap:function(t,n){const e=["x","y"],i=e.length;for(let r,s,c,l,a=0;a<i;a++)if(r=e[a],s=t[r].mid,c=n[r].mid,l=(t[r].size+n[r].size)/2,o(s-c)>=l)return!1;return!0},expandbox:function(t,n){n.x.min<t.x.min&&(t.x.min=n.x.min),n.y.min<t.y.min&&(t.y.min=n.y.min),n.z&&n.z.min<t.z.min&&(t.z.min=n.z.min),n.x.max>t.x.max&&(t.x.max=n.x.max),n.y.max>t.y.max&&(t.y.max=n.y.max),n.z&&n.z.max>t.z.max&&(t.z.max=n.z.max),t.x.mid=(t.x.min+t.x.max)/2,t.y.mid=(t.y.min+t.y.max)/2,t.z&&(t.z.mid=(t.z.min+t.z.max)/2),t.x.size=t.x.max-t.x.min,t.y.size=t.y.max-t.y.min,t.z&&(t.z.size=t.z.max-t.z.min)},pairiteration:function(t,n,e){const o=t.bbox(),i=n.bbox(),r=1e5,s=e||.5;if(o.x.size+o.y.size<s&&i.x.size+i.y.size<s)return[(r*(t._t1+t._t2)/2|0)/r+"/"+(r*(n._t1+n._t2)/2|0)/r];let c=t.split(.5),l=n.split(.5),a=[{left:c.left,right:l.left},{left:c.left,right:l.right},{left:c.right,right:l.right},{left:c.right,right:l.left}];a=a.filter((function(t){return g.bboxoverlap(t.left.bbox(),t.right.bbox())}));let u=[];return 0===a.length||(a.forEach((function(t){u=u.concat(g.pairiteration(t.left,t.right,s))})),u=u.filter((function(t,n){return u.indexOf(t)===n}))),u},getccenter:function(t,n,e){const o=n.x-t.x,s=n.y-t.y,l=e.x-n.x,a=e.y-n.y,u=o*i(f)-s*r(f),h=o*r(f)+s*i(f),y=l*i(f)-a*r(f),x=l*r(f)+a*i(f),d=(t.x+n.x)/2,m=(t.y+n.y)/2,w=(n.x+e.x)/2,b=(n.y+e.y)/2,v=d+u,z=m+h,_=w+y,k=b+x,S=g.lli8(d,m,v,z,w,b,_,k),E=g.dist(S,t);let A,M=c(t.y-S.y,t.x-S.x),O=c(n.y-S.y,n.x-S.x),T=c(e.y-S.y,e.x-S.x);return M<T?((M>O||O>T)&&(M+=p),M>T&&(A=T,T=M,M=A)):T<O&&O<M?(A=T,T=M,M=A):T+=p,S.s=M,S.e=T,S.r=E,S},numberSort:function(t,n){return t-n}};class m{constructor(t){this.curves=[],this._3d=!1,t&&(this.curves=t,this._3d=this.curves[0]._3d)}valueOf(){return this.toString()}toString(){return"["+this.curves.map((function(t){return g.pointsToString(t.points)})).join(", ")+"]"}addCurve(t){this.curves.push(t),this._3d=this._3d||t._3d}length(){return this.curves.map((function(t){return t.length()})).reduce((function(t,n){return t+n}))}curve(t){return this.curves[t]}bbox(){const t=this.curves;for(var n=t[0].bbox(),e=1;e<t.length;e++)g.expandbox(n,t[e].bbox());return n}offset(t){const n=[];return this.curves.forEach((function(e){n.push(...e.offset(t))})),new m(n)}}const{abs:w,min:b,max:v,cos:z,sin:_,acos:k,sqrt:S}=Math,E=Math.PI;class A{constructor(t){let n=t&&t.forEach?t:Array.from(arguments).slice(),e=!1;if("object"==typeof n[0]){e=n.length;const t=[];n.forEach((function(n){["x","y","z"].forEach((function(e){void 0!==n[e]&&t.push(n[e])}))})),n=t}let o=!1;const i=n.length;if(e){if(e>4){if(1!==arguments.length)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");o=!0}}else if(6!==i&&8!==i&&9!==i&&12!==i&&1!==arguments.length)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");const r=this._3d=!o&&(9===i||12===i)||t&&t[0]&&void 0!==t[0].z,s=this.points=[];for(let t=0,e=r?3:2;t<i;t+=e){var c={x:n[t],y:n[t+1]};r&&(c.z=n[t+2]),s.push(c)}const l=this.order=s.length-1,a=this.dims=["x","y"];r&&a.push("z"),this.dimlen=a.length;const u=g.align(s,{p1:s[0],p2:s[l]});this._linear=!u.some((t=>w(t.y)>1e-4)),this._lut=[],this._t1=0,this._t2=1,this.update()}static quadraticFromPoints(t,n,e,o){if(void 0===o&&(o=.5),0===o)return new A(n,n,e);if(1===o)return new A(t,n,n);const i=A.getABC(2,t,n,e,o);return new A(t,i.A,e)}static cubicFromPoints(t,n,e,o,i){void 0===o&&(o=.5);const r=A.getABC(3,t,n,e,o);void 0===i&&(i=g.dist(n,r.C));const s=i*(1-o)/o,c=g.dist(t,e),l=(e.x-t.x)/c,a=(e.y-t.y)/c,u=i*l,h=i*a,p=s*l,f=s*a,y=n.x-u,x=n.y-h,d=n.x+p,m=n.y+f,w=r.A,b=w.x+(y-w.x)/(1-o),v=w.y+(x-w.y)/(1-o),z=w.x+(d-w.x)/o,_=w.y+(m-w.y)/o,k={x:t.x+(b-t.x)/o,y:t.y+(v-t.y)/o},S={x:e.x+(z-e.x)/(1-o),y:e.y+(_-e.y)/(1-o)};return new A(t,k,S,e)}static getUtils(){return g}getUtils(){return A.getUtils()}static get PolyBezier(){return m}valueOf(){return this.toString()}toString(){return g.pointsToString(this.points)}toSVG(){if(this._3d)return!1;const t=this.points,n=["M",t[0].x,t[0].y,2===this.order?"Q":"C"];for(let e=1,o=t.length;e<o;e++)n.push(t[e].x),n.push(t[e].y);return n.join(" ")}setRatios(t){if(t.length!==this.points.length)throw new Error("incorrect number of ratio values");this.ratios=t,this._lut=[]}verify(){const t=this.coordDigest();t!==this._print&&(this._print=t,this.update())}coordDigest(){return this.points.map((function(t,n){return""+n+t.x+t.y+(t.z?t.z:0)})).join("")}update(){this._lut=[],this.dpoints=g.derive(this.points,this._3d),this.computedirection()}computedirection(){const t=this.points,n=g.angle(t[0],t[this.order],t[1]);this.clockwise=n>0}length(){return g.length(this.derivative.bind(this))}static getABC(t=2,n,e,o,i=.5){const r=g.projectionratio(i,t),s=1-r,c={x:r*n.x+s*o.x,y:r*n.y+s*o.y},l=g.abcratio(i,t);return{A:{x:e.x+(e.x-c.x)/l,y:e.y+(e.y-c.y)/l},B:e,C:c,S:n,E:o}}getABC(t,n){n=n||this.get(t);let e=this.points[0],o=this.points[this.order];return A.getABC(this.order,e,n,o,t)}getLUT(t){if(this.verify(),t=t||100,this._lut.length===t)return this._lut;this._lut=[],t--;for(let n,e,o=0;o<t;o++)e=o/(t-1),n=this.compute(e),n.t=e,this._lut.push(n);return this._lut}on(n,e){e=e||5;const o=this.getLUT(),i=[];for(let t,r=0,s=0;r<o.length;r++)t=o[r],g.dist(t,n)<e&&(i.push(t),s+=r/o.length);return!!i.length&&(t/=i.length)}project(t){const n=this.getLUT(),e=n.length-1,o=g.closest(n,t),i=o.mpos,r=(i-1)/e,s=(i+1)/e,c=.1/e;let l,a,u=o.mdist,h=r,p=h;for(u+=1;h<s+c;h+=c)l=this.compute(h),a=g.dist(t,l),a<u&&(u=a,p=h);return p=p<0?0:p>1?1:p,l=this.compute(p),l.t=p,l.d=u,l}get(t){return this.compute(t)}point(t){return this.points[t]}compute(t){return this.ratios?g.computeWithRatios(t,this.points,this.ratios,this._3d):g.compute(t,this.points,this._3d,this.ratios)}raise(){const t=this.points,n=[t[0]],e=t.length;for(let o,i,r=1;r<e;r++)o=t[r],i=t[r-1],n[r]={x:(e-r)/e*o.x+r/e*i.x,y:(e-r)/e*o.y+r/e*i.y};return n[e]=t[e-1],new A(n)}derivative(t){return g.compute(t,this.dpoints[0],this._3d)}dderivative(t){return g.compute(t,this.dpoints[1],this._3d)}align(){let t=this.points;return new A(g.align(t,{p1:t[0],p2:t[t.length-1]}))}curvature(t){return g.curvature(t,this.dpoints[0],this.dpoints[1],this._3d)}inflections(){return g.inflections(this.points)}normal(t){return this._3d?this.__normal3(t):this.__normal2(t)}__normal2(t){const n=this.derivative(t),e=S(n.x*n.x+n.y*n.y);return{x:-n.y/e,y:n.x/e}}__normal3(t){const n=this.derivative(t),e=this.derivative(t+.01),o=S(n.x*n.x+n.y*n.y+n.z*n.z),i=S(e.x*e.x+e.y*e.y+e.z*e.z);n.x/=o,n.y/=o,n.z/=o,e.x/=i,e.y/=i,e.z/=i;const r={x:e.y*n.z-e.z*n.y,y:e.z*n.x-e.x*n.z,z:e.x*n.y-e.y*n.x},s=S(r.x*r.x+r.y*r.y+r.z*r.z);r.x/=s,r.y/=s,r.z/=s;const c=[r.x*r.x,r.x*r.y-r.z,r.x*r.z+r.y,r.x*r.y+r.z,r.y*r.y,r.y*r.z-r.x,r.x*r.z-r.y,r.y*r.z+r.x,r.z*r.z];return{x:c[0]*n.x+c[1]*n.y+c[2]*n.z,y:c[3]*n.x+c[4]*n.y+c[5]*n.z,z:c[6]*n.x+c[7]*n.y+c[8]*n.z}}hull(t){let n=this.points,e=[],o=[],i=0;for(o[i++]=n[0],o[i++]=n[1],o[i++]=n[2],3===this.order&&(o[i++]=n[3]);n.length>1;){e=[];for(let r,s=0,c=n.length-1;s<c;s++)r=g.lerp(t,n[s],n[s+1]),o[i++]=r,e.push(r);n=e}return o}split(t,n){if(0===t&&n)return this.split(n).left;if(1===n)return this.split(t).right;const e=this.hull(t),o={left:2===this.order?new A([e[0],e[3],e[5]]):new A([e[0],e[4],e[7],e[9]]),right:2===this.order?new A([e[5],e[4],e[2]]):new A([e[9],e[8],e[6],e[3]]),span:e};return o.left._t1=g.map(0,0,1,this._t1,this._t2),o.left._t2=g.map(t,0,1,this._t1,this._t2),o.right._t1=g.map(t,0,1,this._t1,this._t2),o.right._t2=g.map(1,0,1,this._t1,this._t2),n?(n=g.map(n,t,1,0,1),o.right.split(n).left):o}extrema(){const t={};let n=[];return this.dims.forEach(function(e){let o=function(t){return t[e]},i=this.dpoints[0].map(o);t[e]=g.droots(i),3===this.order&&(i=this.dpoints[1].map(o),t[e]=t[e].concat(g.droots(i))),t[e]=t[e].filter((function(t){return t>=0&&t<=1})),n=n.concat(t[e].sort(g.numberSort))}.bind(this)),t.values=n.sort(g.numberSort).filter((function(t,e){return n.indexOf(t)===e})),t}bbox(){const t=this.extrema(),n={};return this.dims.forEach(function(e){n[e]=g.getminmax(this,e,t[e])}.bind(this)),n}overlaps(t){const n=this.bbox(),e=t.bbox();return g.bboxoverlap(n,e)}offset(t,n){if(void 0!==n){const e=this.get(t),o=this.normal(t),i={c:e,n:o,x:e.x+o.x*n,y:e.y+o.y*n};return this._3d&&(i.z=e.z+o.z*n),i}if(this._linear){const n=this.normal(0),e=this.points.map((function(e){const o={x:e.x+t*n.x,y:e.y+t*n.y};return e.z&&n.z&&(o.z=e.z+t*n.z),o}));return[new A(e)]}return this.reduce().map((function(n){return n._linear?n.offset(t)[0]:n.scale(t)}))}simple(){if(3===this.order){const t=g.angle(this.points[0],this.points[3],this.points[1]),n=g.angle(this.points[0],this.points[3],this.points[2]);if(t>0&&n<0||t<0&&n>0)return!1}const t=this.normal(0),n=this.normal(1);let e=t.x*n.x+t.y*n.y;return this._3d&&(e+=t.z*n.z),w(k(e))<E/3}reduce(){let t,n,e=0,o=0,i=.01,r=[],s=[],c=this.extrema().values;for(-1===c.indexOf(0)&&(c=[0].concat(c)),-1===c.indexOf(1)&&c.push(1),e=c[0],t=1;t<c.length;t++)o=c[t],n=this.split(e,o),n._t1=e,n._t2=o,r.push(n),e=o;return r.forEach((function(t){for(e=0,o=0;o<=1;)for(o=e+i;o<=1.01;o+=i)if(n=t.split(e,o),!n.simple()){if(o-=i,w(e-o)<i)return[];n=t.split(e,o),n._t1=g.map(e,0,1,t._t1,t._t2),n._t2=g.map(o,0,1,t._t1,t._t2),s.push(n),e=o;break}e<1&&(n=t.split(e,1),n._t1=g.map(e,0,1,t._t1,t._t2),n._t2=t._t2,s.push(n))})),s}scale(t){const n=this.order;let e=!1;if("function"==typeof t&&(e=t),e&&2===n)return this.raise().scale(e);const o=this.clockwise,i=e?e(0):t,r=e?e(1):t,s=[this.offset(0,10),this.offset(1,10)],c=this.points,l=[],a=g.lli4(s[0],s[0].c,s[1],s[1].c);if(!a)throw new Error("cannot scale this curve. Try reducing it first.");return[0,1].forEach((function(t){const e=l[t*n]=g.copy(c[t*n]);e.x+=(t?r:i)*s[t].n.x,e.y+=(t?r:i)*s[t].n.y})),e?([0,1].forEach((function(i){if(2!==n||!i){var r=c[i+1],s={x:r.x-a.x,y:r.y-a.y},u=e?e((i+1)/n):t;e&&!o&&(u=-u);var h=S(s.x*s.x+s.y*s.y);s.x/=h,s.y/=h,l[i+1]={x:r.x+u*s.x,y:r.y+u*s.y}}})),new A(l)):([0,1].forEach((t=>{if(2===n&&t)return;const e=l[t*n],o=this.derivative(t),i={x:e.x+o.x,y:e.y+o.y};l[t+1]=g.lli4(e,i,a,c[t+1])})),new A(l))}outline(t,n,e,o){n=void 0===n?t:n;const i=this.reduce(),r=i.length,s=[];let c,l=[],a=0,u=this.length();const h=void 0!==e&&void 0!==o;function p(t,n,e,o,i){return function(r){const s=o/e,c=(o+i)/e,l=n-t;return g.map(r,0,1,t+s*l,t+c*l)}}i.forEach((function(i){const r=i.length();h?(s.push(i.scale(p(t,e,u,a,r))),l.push(i.scale(p(-n,-o,u,a,r)))):(s.push(i.scale(t)),l.push(i.scale(-n))),a+=r})),l=l.map((function(t){return c=t.points,c[3]?t.points=[c[3],c[2],c[1],c[0]]:t.points=[c[2],c[1],c[0]],t})).reverse();const f=s[0].points[0],y=s[r-1].points[s[r-1].points.length-1],x=l[r-1].points[l[r-1].points.length-1],d=l[0].points[0],w=g.makeline(x,f),b=g.makeline(y,d),v=[w].concat(s).concat([b]).concat(l);return v.length,new m(v)}outlineshapes(t,n,e){n=n||t;const o=this.outline(t,n).curves,i=[];for(let t=1,n=o.length;t<n/2;t++){const r=g.makeshape(o[t],o[n-t],e);r.startcap.virtual=t>1,r.endcap.virtual=t<n/2-1,i.push(r)}return i}intersects(t,n){return t?t.p1&&t.p2?this.lineIntersects(t):(t instanceof A&&(t=t.reduce()),this.curveintersects(this.reduce(),t,n)):this.selfintersects(n)}lineIntersects(t){const n=b(t.p1.x,t.p2.x),e=b(t.p1.y,t.p2.y),o=v(t.p1.x,t.p2.x),i=v(t.p1.y,t.p2.y);return g.roots(this.points,t).filter((t=>{var r=this.get(t);return g.between(r.x,n,o)&&g.between(r.y,e,i)}))}selfintersects(t){const n=this.reduce(),e=n.length-2,o=[];for(let i,r,s,c=0;c<e;c++)r=n.slice(c,c+1),s=n.slice(c+2),i=this.curveintersects(r,s,t),o.push(...i);return o}curveintersects(t,n,e){const o=[];t.forEach((function(t){n.forEach((function(n){t.overlaps(n)&&o.push({left:t,right:n})}))}));let i=[];return o.forEach((function(t){const n=g.pairiteration(t.left,t.right,e);n.length>0&&(i=i.concat(n))})),i}arcs(t){return t=t||.5,this._iterate(t,[])}_error(t,n,e,o){const i=(o-e)/4,r=this.get(e+i),s=this.get(o-i),c=g.dist(t,n),l=g.dist(t,r),a=g.dist(t,s);return w(l-c)+w(a-c)}_iterate(t,n){let e,o=0,i=1;do{e=0,i=1;let r,s,c,l,a,u=this.get(o),h=!1,p=!1,f=i,y=1,x=0;do{if(p=h,l=c,f=(o+i)/2,x++,r=this.get(f),s=this.get(i),c=g.getccenter(u,r,s),c.interval={start:o,end:i},h=this._error(c,u,o,i)<=t,a=p&&!h,a||(y=i),h){if(i>=1){if(c.interval.end=y=1,l=c,i>1){let t={x:c.x+c.r*z(c.e),y:c.y+c.r*_(c.e)};c.e+=g.angle({x:c.x,y:c.y},t,this.get(1))}break}i+=(i-o)/2}else i=f}while(!a&&e++<100);if(e>=100)break;l=l||c,n.push(l),o=y}while(i<1);return n}}function M(t,n){return"number"==typeof t&&isFinite(t)&&t>=0?t:"cell"===n?.5:.24}function O(t,n,e){if("number"==typeof t&&isFinite(t))return{row:e.row,column:e.column+t};if("string"!=typeof t)return"from"===n?{row:e.row,column:e.column}:{row:e.row,column:e.column+1};const[o,i]=t.split(/\s+/,2).map((t=>Number(t??0)));return isFinite(o)&&isFinite(i)?{row:e.row+i,column:e.column+o}:t}function T(t){if("number"==typeof t&&isFinite(t))return{angle:t,strength:1};if(!0===t)return{angle:30,strength:1};if("right"===t)return{angle:-30,strength:1};if("string"!=typeof t)return;let[n,e]=t.split(/\s+/,2).map(Number);return isFinite(n)||(n=0),isFinite(e)||(e=1),{angle:n,strength:e}}function C(t){return"number"==typeof t&&isFinite(t)?t:!0===t?.24:"right"===t?-.24:0}function N(t){return"number"==typeof t&&isFinite(t)&&t>=0?t:.04}function F(t){return"two"===t||"three"===t||"squiggle"===t?t:"one"}function G(t,n,e){return"none"===t?t:"arrow"===t?"three"===e?"arrow3":"two"===e?"arrow2":t:"bar"===t?"three"===e?"bar3":"two"===e?"bar2":t:"harpoon"===t||"-harpoon"===t||"hook"===t||"-hook"===t||"loop"===t||"-loop"===t||"two"===t||"tail"===t?"three"===e||"two"===e?"none":t:"tail"===n?"none":"three"===e?"arrow3":"two"===e?"arrow2":"arrow"}function I(t){return"number"==typeof t&&t>=0&&t<=1?t:.5}function P(t){return"number"==typeof t&&isFinite(t)?t:"right"===t?-.8:.8}function L(t){return!0===t?t:"string"==typeof t&&(t=t.trim()).length>0&&t.split(/\s+/)}function j(t){return{x:Math.cos(t/180*Math.PI),y:-Math.sin(t/180*Math.PI)}}function B(t){const n=Math.acos(t.x)/Math.PI*180;return t.y<=0?n:360-n}function q(t,n,e){if((t%=360)<0&&(t+=360),0===t)return{x:n.x+e.width/2,y:n.y};if(180===t)return{x:n.x-e.width/2,y:n.y};if(90===t)return{x:n.x,y:n.y-e.top};if(270===t)return{x:n.x,y:n.y+e.bottom};const o=Math.abs(Math.tan(t/180*Math.PI));if(t<90){const t=Math.min(e.width/2,e.top/o),i=Math.min(e.top,e.width*o/2);return{x:n.x+t,y:n.y-i}}if(t<180){const t=Math.min(e.width/2,e.top/o),i=Math.min(e.top,e.width*o/2);return{x:n.x-t,y:n.y-i}}if(t<270){const t=Math.min(e.width/2,e.bottom/o),i=Math.min(e.bottom,e.width*o/2);return{x:n.x-t,y:n.y+i}}const i=Math.min(e.width/2,e.bottom/o),r=Math.min(e.bottom,e.width*o/2);return{x:n.x+i,y:n.y+r}}const U=[5.4,6.5,4.8,3,2,1,0,0],R=[4,7,2,3,-2,1,-5.5,0],$=[1.5,8,-.5,2.5,-5,0],D=[0,0,-2.5,0,-5,0],W=[0,0,-4,0,-4,-5,0,-5],J=[0,-5,3,-5,3,0],V=[3,0,3,2.5,3,5],Y=[0,5,0,0,0,-5],H=[0,7.5,0,0,0,-7.5],Z=[0,10,0,0,0,-10];function Q(t,n,e){function o(...t){const o=[],i=Math.floor(t.length/2);for(let s=0;s<i;s++){const i=2*s,{x:c,y:l}=(r={x:t[i],y:t[i+1]},{x:e.x+.04*r.x*n.x-.04*r.y*n.y,y:e.y+.04*r.y*n.x+.04*r.x*n.y});o.push(c,l)}var r;return o}switch(t){case"harpoon":return[new A(o(...U))];case"-harpoon":return[new A(o(...U.map(((t,n)=>n%2==0?t:-t))))];case"arrow":return[new A(o(...U)),new A(o(...U.map(((t,n)=>n%2==0?t:-t))))];case"arrow2":return[new A(o(...R)),new A(o(...R.map(((t,n)=>n%2==0?t:-t))))];case"arrow3":return[new A(o(...$)),new A(o(...$.map(((t,n)=>n%2==0?t:-t)))),new A(o(...D))];case"tail":return[new A(o(...U.map(((t,n)=>n%2==0?-t:t)))),new A(o(...U.map((t=>-t))))];case"two":return[new A(o(...U)),new A(o(...U.map(((t,n)=>n%2==0?t:-t)))),new A(o(...U.map(((t,n)=>n%2==0?t+4.5:t)))),new A(o(...U.map(((t,n)=>n%2==0?t+4.5:-t))))];case"hook":return[new A(o(...W))];case"-hook":return[new A(o(...W.map(((t,n)=>n%2==0?t:-t))))];case"loop":return[new A(o(...W)),new A(o(...J)),new A(o(...V))];case"-loop":return[new A(o(...W.map(((t,n)=>n%2==0?t:-t)))),new A(o(...J.map(((t,n)=>n%2==0?t:-t)))),new A(o(...V.map(((t,n)=>n%2==0?t:-t))))];case"bar":return[new A(o(...Y))];case"bar2":return[new A(o(...H))];case"bar3":return[new A(o(...Z))];case"none":return[]}}function X(t){let n=0;const e=[];for(const o of t){const t=o.length();t>0&&(n+=t,e.push({length:t,bezier:o}))}if(n<1||0===e.length)return t;const o=.25,i=Math.floor(n/o)-1,r=o,s=i*o,c=[];let l,a=0,u=0;for(const{length:t,bezier:n}of e){const e=u+t;if(u<r&&(e<=r?c.push(n):c.push(n.split(0,(r-u)/t))),a<i)for(;;){const r=(a+1)*o;if(r>e)break;const s=n.get((r-u)/t);if(void 0!==l){const t=s.x-l.x,n=s.y-l.y,e=Math.sqrt(t**2+n**2);if(e>0){const o={x:t/e,y:n/e},i={x:(l.x+s.x)/2,y:(l.y+s.y)/2};a%2==1?(i.x+=.1*o.y,i.y-=.1*o.x):(i.x-=.1*o.y,i.y+=.1*o.x),c.push(new A(l.x,l.y,(l.x+i.x)/2,(l.y+i.y)/2,i.x,i.y)),c.push(new A(i.x,i.y,(i.x+s.x)/2,(i.y+s.y)/2,s.x,s.y))}}if(l=s,a++,a===i)break}e>s&&(u>=s?c.push(n):c.push(n.split((s-u)/t,1))),u=e}return c}function K(t,n){const e=document.createElement("div"),o=document.createElement("div"),i=document.createElement("div"),r=document.createElement("div");return e.style.position="absolute",e.style.top="0",e.style.width="0",e.style.display="flex",e.style.justifyContent="center",i.style.display="inline-block",r.style.display="inline-block",r.style.verticalAlign="-0.5ex",r.style.width="max-content",n.after(e),e.append(o),o.append(i),o.append(r),r.append(t),{leftControler:e,topControler:i,container:r}}function tt(t,n,e,o){const{height:i,width:r}=t.container.getBoundingClientRect(),s=i*n,c=r*e;t.topControler.style.height=s+"em";const{top:l}=t.topControler.getBoundingClientRect(),{top:a}=t.container.getBoundingClientRect(),u=Math.min(s,(a-l)*n);return{height:s+2*o,width:c+2*o,top:s-u+o,bottom:u+o}}function nt(t,n){t.leftControler.style.left=n.x+"em",t.topControler.style.height=n.y+"em"}const et=async(t,n)=>{const e="number"==typeof(o=t.options["draw-delay"]??n.extractor.extractLastGlobalOption("draw-delay","cd",n.context.tagToGlobalOptions))&&isFinite(o)&&o>=0?1e3*o:0;var o;const i=function(t){return"number"==typeof t&&isFinite(t)&&t>=1&&t%1==0?t:1}(t.options["draw-num"]??n.extractor.extractLastGlobalOption("draw-num","cd",n.context.tagToGlobalOptions)),r=function(t){if("number"==typeof t&&isFinite(t))return{row:t,column:t};if("string"==typeof t){let[n,e]=t.split(/\s+/,2).map(Number);return(!isFinite(n)||n<0)&&(n=2.4),(!isFinite(e)||e<0)&&(e=1.8),{row:e,column:n}}return{row:1.8,column:2.4}}(t.options.gap??n.extractor.extractLastGlobalOption("gap","cd",n.context.tagToGlobalOptions)),s=M(t.options["cell-margin"]??n.extractor.extractLastGlobalOption("cell-margin","cd",n.context.tagToGlobalOptions),"cell"),c=document.createElement("div"),l=document.createElementNS("http://www.w3.org/2000/svg","svg");c.classList.add("cd"),c.style.position="relative",l.style.position="absolute",l.style.left="0",l.style.top="0",c.append(l);let a={children:[],id:""},u=[a];const h=[u],p=[],f={};function y(t){const e=n.base.stringToId(t),o=f[e]=(f[e]??0)+1;return o>1||0===e.length?`${e}~${o}`:e}function x(e,o){const i=[],r={tag:"katex"===o?o:"div",options:{},children:[]};for(const o of e){if(0===o.length){r.children.push(o);continue}const e=o[0];if("string"==typeof e){r.children.push(o);continue}let{at:s,shift:c,margin:l}=e.options,a=e.options["cd-id"];void 0===s&&void 0===c&&void 0===l&&void 0===a?r.children.push(o):("string"!=typeof a&&(a=n.base.unitToInlinePlainString(e)),i.push({at:I(s),shift:P(c),margin:M(l??t.options["label-margin"]??n.extractor.extractLastGlobalOption("label-margin","cd",n.context.tagToGlobalOptions),"label"),unit:e,id:y(a),clear:L(e.options.clear)}))}if(r.children.length>0){const e=n.base.unitToInlinePlainString(r);i.push({at:.5,shift:.8,margin:M(t.options["label-margin"]??n.extractor.extractLastGlobalOption("label-margin","cd",n.context.tagToGlobalOptions),"label"),unit:r,id:y(e),clear:!1})}return i}for(const e of t.children)if(0!==e.length){{const o=e[0];if("string"!=typeof o){if("ar"===o.tag||"katex"===o.tag&&!0===o.options.ar){const e={row:h.length-1,column:u.length-1},i=F(o.options.body),r=x(o.children,o.tag),s=document.createElementNS("http://www.w3.org/2000/svg","g");if("string"==typeof o.options.class&&o.options.class.length>0)try{s.setAttribute("class",o.options.class)}catch(t){console.log(t)}if("string"==typeof o.options.style&&o.options.style.length>0)try{s.setAttribute("style",o.options.style)}catch(t){console.log(t)}if("string"==typeof o.options.slide&&o.options.slide.length>0)try{s.dataset.slide=o.options.slide}catch(t){console.log(t)}l.append(s),p.push({from:O(o.options.from,"from",e),to:O(o.options.to,"to",e),out:T(o.options.out),in:T(o.options.in),bend:T(o.options.bend),shift:C(o.options.shift),margin:M(o.options.margin??t.options["arrow-margin"]??n.extractor.extractLastGlobalOption("arrow-margin","cd",n.context.tagToGlobalOptions),"arrow"),width:N(o.options.width??t.options["arrow-width"]??n.extractor.extractLastGlobalOption("arrow-width","cd",n.context.tagToGlobalOptions)),body:i,head:G(o.options.head,"head",i),tail:G(o.options.tail,"tail",i),labels:r,g:s,clear:L(o.options.clear)});continue}}else{if("&"===o&&1===e.length){u.push(a={children:[],id:""});continue}if("\\"===o&&2===e.length&&"\\"===e[1]){h.push(u=[a={children:[],id:""}]);continue}}}if(a.children.push(e),0===a.id.length){const t=n.base.lineToInlinePlainString(e);t.length>0&&(a.id=y(t))}}else a.children.push(e);const d={},g=[];for(let e=0;e<h.length;e++){const o=h[e];for(let i=0;i<o.length;i++){const{children:r,id:s}=o[i];0!==r.length&&(g.push({element:K("CD"===t.tag?await n.compileUnit({tag:"katex",options:{},children:r}):await n.compileSTDN(r),l),position:{row:e,column:i},id:s}),s.length>0&&(d[s]=!0))}}const m={},w=[];let b,v,z=p;for(;;){const t=[];for(const e of z){const{from:o,to:i}=e;if("string"!=typeof o||d[o])if("string"!=typeof i||d[i]){w.push(e);for(const{unit:t,id:o}of e.labels){const e=K(await n.compileUnit(t),l);!0!==t.options["normal-font-size"]&&(e.container.style.fontSize="var(--length-font-log)"),m[o]=e,d[o]=!0}}else t.push(e);else t.push(e)}if(z.length===t.length)break;z=t}function _(){l.innerHTML="";const t=[],n=[],e=Number(getComputedStyle(c).fontSize.slice(0,-2));let o=1/e,i=1/e;const a=c.closest("foreignObject");if(null!==a){const{height:t,width:n}=a.getBoundingClientRect();o*=a.height.animVal.value/t,i*=a.width.animVal.value/n}const u={},h={};for(const{element:e,position:r,id:c}of g){const l=tt(e,o,i,s);u[r.row+" "+r.column]=l,c.length>0&&(h[c]=l),(t[r.row]??0)<l.height&&(t[r.row]=l.height),(n[r.column]??0)<l.width&&(n[r.column]=l.width)}function p(e){let o=e.column>=0?(n[0]??0)/2:0,i=e.row>=0?(t[0]??0)/2:0;for(let t=1;t<=e.column;t++){const e=n[t-1],i=n[t];void 0!==e&&(o+=e/2,void 0!==i&&(o+=r.column)),void 0!==i&&(o+=i/2)}if(e.column%1!=0){const t=Math.floor(e.column),i=n[t],s=n[t+1];void 0!==i&&(o+=(e.column-t)*i/2,void 0!==s&&(o+=(e.column-t)*r.column)),void 0!==s&&(o+=(e.column-t)*s/2)}for(let n=1;n<=e.row;n++){const e=t[n-1],o=t[n];void 0!==e&&(i+=e/2,void 0!==o&&(i+=r.row)),void 0!==o&&(i+=o/2)}if(e.row%1!=0){const n=Math.floor(e.row),o=t[n],s=t[n+1];void 0!==o&&(i+=(e.row-n)*o/2,void 0!==s&&(i+=(e.row-n)*r.row)),void 0!==s&&(i+=(e.row-n)*s/2)}return{x:o,y:i}}const f={};for(const{position:t,id:n}of g){const e=p(t);n.length>0&&(f[n]=e)}let y=0,x=0,d=p({row:0,column:n.length}).x,b=p({row:t.length,column:0}).y;function v(t,n,e){const o=[];for(const e of t){o.push(e.toSVG());const{x:t,y:i}=e.bbox(),r=t.min-n/2,s=t.max+n/2,c=i.min-n/2,l=i.max+n/2;r<y&&(y=r),s>d&&(d=s),c<x&&(x=c),l>b&&(b=l)}const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d",o.join(" ")),i.style.strokeWidth=n+"px",i.style.fill="none",e.append(i),o}function z(t,n,e,o){const i=t.offset(-e);return Array.isArray(i)?v(i,n,o):[]}function _(t,n,e,o){const i=t.offset(-e);return Array.isArray(i)?v(X(i),n,o):[]}const k=[],S=[],E=[],M=[];for(const{from:t,to:n,out:e,in:r,bend:s,head:c,tail:a,shift:g,body:S,g:E,labels:O,clear:T,margin:C,width:N}of w){let w,F,G,I,P,L,U,R,$,D;if("string"!=typeof t){w=p(t);const n=u[t.row+" "+t.column];G=void 0===n?{height:0,width:0,top:0,bottom:0}:n}else{const n=f[t],e=h[t];if(void 0===n||void 0===e)continue;w=n,G=e}if("string"!=typeof n){F=p(n);const t=u[n.row+" "+n.column];I=void 0===t?{height:0,width:0,top:0,bottom:0}:t}else{const t=f[n],e=h[n];if(void 0===t||void 0===e)continue;F=t,I=e}if(void 0===e||void 0===r){const t=F.x-w.x,n=F.y-w.y,o=Math.sqrt(t**2+n**2);if(0===o)continue;const i=B({x:t/o,y:n/o});let c=0,l=1;if(void 0!==s&&(c=s.angle,l=s.strength),void 0===e){const t=i+c;P=q(t,w,G),U=j(t),$=l}else P=q(e.angle,w,G),U=j(e.angle),$=e.strength;if(void 0===r){const t=i+180-c;L=q(t,F,I),R=j(t),D=l}else L=q(r.angle,F,I),R=j(r.angle),D=r.strength}else P=q(e.angle,w,G),L=q(r.angle,F,I),U=j(e.angle),R=j(r.angle),$=e.strength,D=r.strength;"arrow2"!==c&&"arrow3"!==c&&"hook"!==c&&"-hook"!==c&&"loop"!==c&&"-loop"!==c&&"tail"!==c||(L.x=L.x+.16*R.x,L.y=L.y+.16*R.y),"arrow2"!==a&&"arrow3"!==a&&"hook"!==a&&"-hook"!==a&&"loop"!==a&&"-loop"!==a&&"tail"!==a||(P.x=P.x+.16*U.x,P.y=P.y+.16*U.y);const W=Math.sqrt((L.x-P.x)**2+(L.y-P.y)**2);if(0===W)continue;const J={x:P.x+U.x*W/3*$,y:P.y+U.y*W/3*$},V={x:L.x+R.x*W/3*D,y:L.y+R.y*W/3*D},Y=new A(P.x,P.y,J.x,J.y,V.x,V.y,L.x,L.y);E.innerHTML="",l.append(E);const H=[];let Z=!1;"three"===S?(H.push(...z(Y,N,g+.2,E)),H.push(...z(Y,N,g,E)),H.push(...z(Y,N,g-.2,E))):"two"===S?(H.push(...z(Y,N,g+.1,E)),H.push(...z(Y,N,g-.1,E))):"squiggle"===S?H.push(..._(Y,N,g,E)):(H.push(...z(Y,N,g,E)),Z=!0);{const t=Q(c,R,{x:L.x-R.y*g,y:L.y+R.x*g});t.length>0&&(H.push(...v(t,N,E)),Z=!1)}{const t=Q(a,U,{x:P.x+U.y*g,y:P.y-U.x*g});t.length>0&&(H.push(...v(t,N,E)),Z=!1)}if(!1!==T&&H.length>0&&M.push({data:{type:"path",drawString:H.join(" "),width:2*C+N},clear:!0===T?k.length:T}),Z){const t=document.createElementNS("http://www.w3.org/2000/svg","rect");t.setAttribute("x","0"),t.setAttribute("y","0"),t.setAttribute("width",N.toString()),t.setAttribute("height",N.toString()),t.style.stroke=t.style.fill="none",E.append(t)}k.push(E);for(const{at:t,shift:n,id:e,clear:r,margin:s}of O){const c=Y.get(t),l=Y.normal(t);let a=g+n;0!==n&&("three"===S?a+=.2*Math.sign(n):"two"!==S&&"squiggle"!==S||(a+=.1*Math.sign(n)));const u={x:c.x-l.x*a,y:c.y-l.y*a};f[e]=u;const p=m[e];if(void 0===p)throw new Error;const w=tt(p,o,i,s);h[e]=w;const v=u.x-w.width/2,z=u.x+w.width/2,_=u.y-w.top,E=u.y+w.bottom;v<y&&(y=v),z>d&&(d=z),_<x&&(x=_),E>b&&(b=E),!1!==r&&M.push({data:{type:"box",x:v.toString(),y:_.toString(),width:w.width.toString(),height:w.height.toString()},clear:!0===r?k.length:r})}}M.forEach((function({data:t,clear:n}){for(let e=0;e<k.length;e++){const o=k[e];t:{if("number"!=typeof n){for(const t of n)if(o.classList.contains(t))break t;continue}if(e>=n)break}let i=S[e];if(void 0===i){i=S[e]=document.createElementNS("http://www.w3.org/2000/svg","mask");const t=document.createElementNS("http://www.w3.org/2000/svg","rect");t.style.fill="white",l.append(i),i.append(t),E.push(t);const n=Math.random().toString();i.id=n,o.style.mask=`url(#${n})`}if("path"===t.type){const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.style.strokeWidth=t.width+"px",n.style.stroke="black",n.style.fill="none",n.setAttribute("d",t.drawString),i.append(n);continue}const r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.style.stroke="none",r.style.fill="black",r.setAttribute("x",t.x),r.setAttribute("y",t.y),r.setAttribute("width",t.width),r.setAttribute("height",t.height),i.append(r)}}));const O=d-y,T=b-x;c.style.width=l.style.width=O+"em",c.style.height=l.style.height=T+"em",l.setAttribute("viewBox",`${y} ${x} ${O} ${T}`);for(const{element:t,position:n}of g){const e=p(n);nt(t,{x:e.x-y,y:e.y-x})}for(const t of Object.keys(m)){const n=m[t],e=f[t];void 0!==n&&void 0!==e&&nt(n,{x:e.x-y,y:e.y-x})}for(const t of E)t.setAttribute("x",y.toString()),t.setAttribute("y",x.toString()),t.setAttribute("width",O.toString()),t.setAttribute("height",T.toString())}let k=!1;const S=async()=>{if(c.isConnected&&!k){k=!0,void 0!==b&&b.disconnect(),void 0!==v&&clearInterval(v),await new Promise((t=>setTimeout(t,e)));for(let t=0;t<i;t++)_(),await new Promise((t=>setTimeout(t,1e3)))}};return b=new MutationObserver(S),v=window.setInterval(S,1e3),b.observe(document.body,{childList:!0,subtree:!0}),c},ot=et;var it=e.CD,rt=e.W7,st=e.aC,ct=e.cd,lt=e.ib,at=e.Zg,ut=e.rY,ht=e.in,pt=e.$U,ft=e.AY;export{it as CD,rt as absoluteElementToBox,st as angleToD,ct as cd,lt as createAbsoluteElement,at as createArrowMark,ut as dToAngle,ht as getEdgePoint,pt as piecesToSquiggle,ft as placeAbsoluteElement};
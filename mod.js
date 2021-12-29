var n={d:(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n)},e={};n.d(e,{CD:()=>rt,W7:()=>K,aC:()=>j,cd:()=>ot,ib:()=>X,Zg:()=>Z,rY:()=>B,in:()=>L,$U:()=>Q,AY:()=>tt});const{abs:i,cos:o,sin:r,acos:s,atan2:c,sqrt:l,pow:a}=Math;function u(t){return t<0?-a(-t,1/3):a(t,1/3)}const h=Math.PI,p=2*h,f=h/2,y=Number.MAX_SAFE_INTEGER||9007199254740991,x=Number.MIN_SAFE_INTEGER||-9007199254740991,d={x:0,y:0,z:0},g={Tvalues:[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,-.9951872199970213,.9951872199970213],Cvalues:[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872],arcfn:function(t,n){const e=n(t);let i=e.x*e.x+e.y*e.y;return void 0!==e.z&&(i+=e.z*e.z),l(i)},compute:function(t,n,e){if(0===t)return n[0].t=0,n[0];const i=n.length-1;if(1===t)return n[i].t=1,n[i];const o=1-t;let r=n;if(0===i)return n[0].t=t,n[0];if(1===i){const n={x:o*r[0].x+t*r[1].x,y:o*r[0].y+t*r[1].y,t};return e&&(n.z=o*r[0].z+t*r[1].z),n}if(i<4){let n,s,c,l=o*o,a=t*t,u=0;2===i?(r=[r[0],r[1],r[2],d],n=l,s=o*t*2,c=a):3===i&&(n=l*o,s=l*t*3,c=o*a*3,u=t*a);const h={x:n*r[0].x+s*r[1].x+c*r[2].x+u*r[3].x,y:n*r[0].y+s*r[1].y+c*r[2].y+u*r[3].y,t};return e&&(h.z=n*r[0].z+s*r[1].z+c*r[2].z+u*r[3].z),h}const s=JSON.parse(JSON.stringify(n));for(;s.length>1;){for(let n=0;n<s.length-1;n++)s[n]={x:s[n].x+(s[n+1].x-s[n].x)*t,y:s[n].y+(s[n+1].y-s[n].y)*t},void 0!==s[n].z&&(s[n]=s[n].z+(s[n+1].z-s[n].z)*t);s.splice(s.length-1,1)}return s[0].t=t,s[0]},computeWithRatios:function(t,n,e,i){const o=1-t,r=e,s=n;let c,l=r[0],a=r[1],u=r[2],h=r[3];return l*=o,a*=t,2===s.length?(c=l+a,{x:(l*s[0].x+a*s[1].x)/c,y:(l*s[0].y+a*s[1].y)/c,z:!!i&&(l*s[0].z+a*s[1].z)/c,t}):(l*=o,a*=2*o,u*=t*t,3===s.length?(c=l+a+u,{x:(l*s[0].x+a*s[1].x+u*s[2].x)/c,y:(l*s[0].y+a*s[1].y+u*s[2].y)/c,z:!!i&&(l*s[0].z+a*s[1].z+u*s[2].z)/c,t}):(l*=o,a*=1.5*o,u*=3*o,h*=t*t*t,4===s.length?(c=l+a+u+h,{x:(l*s[0].x+a*s[1].x+u*s[2].x+h*s[3].x)/c,y:(l*s[0].y+a*s[1].y+u*s[2].y+h*s[3].y)/c,z:!!i&&(l*s[0].z+a*s[1].z+u*s[2].z+h*s[3].z)/c,t}):void 0))},derive:function(t,n){const e=[];for(let i=t,o=i.length,r=o-1;o>1;o--,r--){const t=[];for(let e,o=0;o<r;o++)e={x:r*(i[o+1].x-i[o].x),y:r*(i[o+1].y-i[o].y)},n&&(e.z=r*(i[o+1].z-i[o].z)),t.push(e);e.push(t),i=t}return e},between:function(t,n,e){return n<=t&&t<=e||g.approximately(t,n)||g.approximately(t,e)},approximately:function(t,n,e){return i(t-n)<=(e||1e-6)},length:function(t){const n=g.Tvalues.length;let e=0;for(let i,o=0;o<n;o++)i=.5*g.Tvalues[o]+.5,e+=g.Cvalues[o]*g.arcfn(i,t);return.5*e},map:function(t,n,e,i,o){return i+(t-n)/(e-n)*(o-i)},lerp:function(t,n,e){const i={x:n.x+t*(e.x-n.x),y:n.y+t*(e.y-n.y)};return void 0!==n.z&&void 0!==e.z&&(i.z=n.z+t*(e.z-n.z)),i},pointToString:function(t){let n=t.x+"/"+t.y;return void 0!==t.z&&(n+="/"+t.z),n},pointsToString:function(t){return"["+t.map(g.pointToString).join(", ")+"]"},copy:function(t){return JSON.parse(JSON.stringify(t))},angle:function(t,n,e){const i=n.x-t.x,o=n.y-t.y,r=e.x-t.x,s=e.y-t.y;return c(i*s-o*r,i*r+o*s)},round:function(t,n){const e=""+t,i=e.indexOf(".");return parseFloat(e.substring(0,i+1+n))},dist:function(t,n){const e=t.x-n.x,i=t.y-n.y;return l(e*e+i*i)},closest:function(t,n){let e,i,o=a(2,63);return t.forEach((function(t,r){i=g.dist(n,t),i<o&&(o=i,e=r)})),{mdist:o,mpos:e}},abcratio:function(t,n){if(2!==n&&3!==n)return!1;if(void 0===t)t=.5;else if(0===t||1===t)return t;const e=a(t,n)+a(1-t,n);return i((e-1)/e)},projectionratio:function(t,n){if(2!==n&&3!==n)return!1;if(void 0===t)t=.5;else if(0===t||1===t)return t;const e=a(1-t,n);return e/(a(t,n)+e)},lli8:function(t,n,e,i,o,r,s,c){const l=(t-e)*(r-c)-(n-i)*(o-s);return 0!=l&&{x:((t*i-n*e)*(o-s)-(t-e)*(o*c-r*s))/l,y:((t*i-n*e)*(r-c)-(n-i)*(o*c-r*s))/l}},lli4:function(t,n,e,i){const o=t.x,r=t.y,s=n.x,c=n.y,l=e.x,a=e.y,u=i.x,h=i.y;return g.lli8(o,r,s,c,l,a,u,h)},lli:function(t,n){return g.lli4(t,t.c,n,n.c)},makeline:function(t,n){const e=t.x,i=t.y,o=n.x,r=n.y,s=(o-e)/3,c=(r-i)/3;return new M(e,i,e+s,i+c,e+2*s,i+2*c,o,r)},findbbox:function(t){let n=y,e=y,i=x,o=x;return t.forEach((function(t){const r=t.bbox();n>r.x.min&&(n=r.x.min),e>r.y.min&&(e=r.y.min),i<r.x.max&&(i=r.x.max),o<r.y.max&&(o=r.y.max)})),{x:{min:n,mid:(n+i)/2,max:i,size:i-n},y:{min:e,mid:(e+o)/2,max:o,size:o-e}}},shapeintersections:function(t,n,e,i,o){if(!g.bboxoverlap(n,i))return[];const r=[],s=[t.startcap,t.forward,t.back,t.endcap],c=[e.startcap,e.forward,e.back,e.endcap];return s.forEach((function(n){n.virtual||c.forEach((function(i){if(i.virtual)return;const s=n.intersects(i,o);s.length>0&&(s.c1=n,s.c2=i,s.s1=t,s.s2=e,r.push(s))}))})),r},makeshape:function(t,n,e){const i=n.points.length,o=t.points.length,r=g.makeline(n.points[i-1],t.points[0]),s=g.makeline(t.points[o-1],n.points[0]),c={startcap:r,forward:t,back:n,endcap:s,bbox:g.findbbox([r,t,n,s]),intersections:function(t){return g.shapeintersections(c,c.bbox,t,t.bbox,e)}};return c},getminmax:function(t,n,e){if(!e)return{min:0,max:0};let i,o,r=y,s=x;-1===e.indexOf(0)&&(e=[0].concat(e)),-1===e.indexOf(1)&&e.push(1);for(let c=0,l=e.length;c<l;c++)i=e[c],o=t.get(i),o[n]<r&&(r=o[n]),o[n]>s&&(s=o[n]);return{min:r,mid:(r+s)/2,max:s,size:s-r}},align:function(t,n){const e=n.p1.x,i=n.p1.y,s=-c(n.p2.y-i,n.p2.x-e);return t.map((function(t){return{x:(t.x-e)*o(s)-(t.y-i)*r(s),y:(t.x-e)*r(s)+(t.y-i)*o(s)}}))},roots:function(t,n){n=n||{p1:{x:0,y:0},p2:{x:1,y:0}};const e=t.length-1,i=g.align(t,n),r=function(t){return 0<=t&&t<=1};if(2===e){const t=i[0].y,n=i[1].y,e=i[2].y,o=t-2*n+e;if(0!==o){const i=-l(n*n-t*e),s=-t+n;return[-(i+s)/o,-(-i+s)/o].filter(r)}return n!==e&&0===o?[(2*n-e)/(2*n-2*e)].filter(r):[]}const c=i[0].y,a=i[1].y,h=i[2].y;let f=3*a-c-3*h+i[3].y,y=3*c-6*a+3*h,x=-3*c+3*a,d=c;if(g.approximately(f,0)){if(g.approximately(y,0))return g.approximately(x,0)?[]:[-d/x].filter(r);const t=l(x*x-4*y*d),n=2*y;return[(t-x)/n,(-x-t)/n].filter(r)}y/=f,x/=f,d/=f;const m=(3*x-y*y)/3,w=m/3,b=(2*y*y*y-9*y*x+27*d)/27,v=b/2,z=v*v+w*w*w;let _,k,S,E,M;if(z<0){const t=-m/3,n=l(t*t*t),e=-b/(2*n),i=s(e<-1?-1:e>1?1:e),c=2*u(n);return S=c*o(i/3)-y/3,E=c*o((i+p)/3)-y/3,M=c*o((i+2*p)/3)-y/3,[S,E,M].filter(r)}if(0===z)return _=v<0?u(-v):-u(v),S=2*_-y/3,E=-_-y/3,[S,E].filter(r);{const t=l(z);return _=u(-v+t),k=u(v+t),[_-k-y/3].filter(r)}},droots:function(t){if(3===t.length){const n=t[0],e=t[1],i=t[2],o=n-2*e+i;if(0!==o){const t=-l(e*e-n*i),r=-n+e;return[-(t+r)/o,-(-t+r)/o]}return e!==i&&0===o?[(2*e-i)/(2*(e-i))]:[]}if(2===t.length){const n=t[0],e=t[1];return n!==e?[n/(n-e)]:[]}return[]},curvature:function(t,n,e,o,r){let s,c,u,h,p=0,f=0;const y=g.compute(t,n),x=g.compute(t,e),d=y.x*y.x+y.y*y.y;if(o?(s=l(a(y.y*x.z-x.y*y.z,2)+a(y.z*x.x-x.z*y.x,2)+a(y.x*x.y-x.x*y.y,2)),c=a(d+y.z*y.z,1.5)):(s=y.x*x.y-y.y*x.x,c=a(d,1.5)),0===s||0===c)return{k:0,r:0};if(p=s/c,f=c/s,!r){const r=g.curvature(t-.001,n,e,o,!0).k,s=g.curvature(t+.001,n,e,o,!0).k;h=(s-p+(p-r))/2,u=(i(s-p)+i(p-r))/2}return{k:p,r:f,dk:h,adk:u}},inflections:function(t){if(t.length<4)return[];const n=g.align(t,{p1:t[0],p2:t.slice(-1)[0]}),e=n[2].x*n[1].y,i=n[3].x*n[1].y,o=n[1].x*n[2].y,r=18*(-3*e+2*i+3*o-n[3].x*n[2].y),s=18*(3*e-i-3*o),c=18*(o-e);if(g.approximately(r,0)){if(!g.approximately(s,0)){let t=-c/s;if(0<=t&&t<=1)return[t]}return[]}const l=s*s-4*r*c,a=Math.sqrt(l),u=2*r;return g.approximately(u,0)?[]:[(a-s)/u,-(s+a)/u].filter((function(t){return 0<=t&&t<=1}))},bboxoverlap:function(t,n){const e=["x","y"],o=e.length;for(let r,s,c,l,a=0;a<o;a++)if(r=e[a],s=t[r].mid,c=n[r].mid,l=(t[r].size+n[r].size)/2,i(s-c)>=l)return!1;return!0},expandbox:function(t,n){n.x.min<t.x.min&&(t.x.min=n.x.min),n.y.min<t.y.min&&(t.y.min=n.y.min),n.z&&n.z.min<t.z.min&&(t.z.min=n.z.min),n.x.max>t.x.max&&(t.x.max=n.x.max),n.y.max>t.y.max&&(t.y.max=n.y.max),n.z&&n.z.max>t.z.max&&(t.z.max=n.z.max),t.x.mid=(t.x.min+t.x.max)/2,t.y.mid=(t.y.min+t.y.max)/2,t.z&&(t.z.mid=(t.z.min+t.z.max)/2),t.x.size=t.x.max-t.x.min,t.y.size=t.y.max-t.y.min,t.z&&(t.z.size=t.z.max-t.z.min)},pairiteration:function(t,n,e){const i=t.bbox(),o=n.bbox(),r=1e5,s=e||.5;if(i.x.size+i.y.size<s&&o.x.size+o.y.size<s)return[(r*(t._t1+t._t2)/2|0)/r+"/"+(r*(n._t1+n._t2)/2|0)/r];let c=t.split(.5),l=n.split(.5),a=[{left:c.left,right:l.left},{left:c.left,right:l.right},{left:c.right,right:l.right},{left:c.right,right:l.left}];a=a.filter((function(t){return g.bboxoverlap(t.left.bbox(),t.right.bbox())}));let u=[];return 0===a.length||(a.forEach((function(t){u=u.concat(g.pairiteration(t.left,t.right,s))})),u=u.filter((function(t,n){return u.indexOf(t)===n}))),u},getccenter:function(t,n,e){const i=n.x-t.x,s=n.y-t.y,l=e.x-n.x,a=e.y-n.y,u=i*o(f)-s*r(f),h=i*r(f)+s*o(f),y=l*o(f)-a*r(f),x=l*r(f)+a*o(f),d=(t.x+n.x)/2,m=(t.y+n.y)/2,w=(n.x+e.x)/2,b=(n.y+e.y)/2,v=d+u,z=m+h,_=w+y,k=b+x,S=g.lli8(d,m,v,z,w,b,_,k),E=g.dist(S,t);let M,A=c(t.y-S.y,t.x-S.x),O=c(n.y-S.y,n.x-S.x),T=c(e.y-S.y,e.x-S.x);return A<T?((A>O||O>T)&&(A+=p),A>T&&(M=T,T=A,A=M)):T<O&&O<A?(M=T,T=A,A=M):T+=p,S.s=A,S.e=T,S.r=E,S},numberSort:function(t,n){return t-n}};class m{constructor(t){this.curves=[],this._3d=!1,t&&(this.curves=t,this._3d=this.curves[0]._3d)}valueOf(){return this.toString()}toString(){return"["+this.curves.map((function(t){return g.pointsToString(t.points)})).join(", ")+"]"}addCurve(t){this.curves.push(t),this._3d=this._3d||t._3d}length(){return this.curves.map((function(t){return t.length()})).reduce((function(t,n){return t+n}))}curve(t){return this.curves[t]}bbox(){const t=this.curves;for(var n=t[0].bbox(),e=1;e<t.length;e++)g.expandbox(n,t[e].bbox());return n}offset(t){const n=[];return this.curves.forEach((function(e){n.push(...e.offset(t))})),new m(n)}}const{abs:w,min:b,max:v,cos:z,sin:_,acos:k,sqrt:S}=Math,E=Math.PI;class M{constructor(t){let n=t&&t.forEach?t:Array.from(arguments).slice(),e=!1;if("object"==typeof n[0]){e=n.length;const t=[];n.forEach((function(n){["x","y","z"].forEach((function(e){void 0!==n[e]&&t.push(n[e])}))})),n=t}let i=!1;const o=n.length;if(e){if(e>4){if(1!==arguments.length)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");i=!0}}else if(6!==o&&8!==o&&9!==o&&12!==o&&1!==arguments.length)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");const r=this._3d=!i&&(9===o||12===o)||t&&t[0]&&void 0!==t[0].z,s=this.points=[];for(let t=0,e=r?3:2;t<o;t+=e){var c={x:n[t],y:n[t+1]};r&&(c.z=n[t+2]),s.push(c)}const l=this.order=s.length-1,a=this.dims=["x","y"];r&&a.push("z"),this.dimlen=a.length;const u=g.align(s,{p1:s[0],p2:s[l]});this._linear=!u.some((t=>w(t.y)>1e-4)),this._lut=[],this._t1=0,this._t2=1,this.update()}static quadraticFromPoints(t,n,e,i){if(void 0===i&&(i=.5),0===i)return new M(n,n,e);if(1===i)return new M(t,n,n);const o=M.getABC(2,t,n,e,i);return new M(t,o.A,e)}static cubicFromPoints(t,n,e,i,o){void 0===i&&(i=.5);const r=M.getABC(3,t,n,e,i);void 0===o&&(o=g.dist(n,r.C));const s=o*(1-i)/i,c=g.dist(t,e),l=(e.x-t.x)/c,a=(e.y-t.y)/c,u=o*l,h=o*a,p=s*l,f=s*a,y=n.x-u,x=n.y-h,d=n.x+p,m=n.y+f,w=r.A,b=w.x+(y-w.x)/(1-i),v=w.y+(x-w.y)/(1-i),z=w.x+(d-w.x)/i,_=w.y+(m-w.y)/i,k={x:t.x+(b-t.x)/i,y:t.y+(v-t.y)/i},S={x:e.x+(z-e.x)/(1-i),y:e.y+(_-e.y)/(1-i)};return new M(t,k,S,e)}static getUtils(){return g}getUtils(){return M.getUtils()}static get PolyBezier(){return m}valueOf(){return this.toString()}toString(){return g.pointsToString(this.points)}toSVG(){if(this._3d)return!1;const t=this.points,n=["M",t[0].x,t[0].y,2===this.order?"Q":"C"];for(let e=1,i=t.length;e<i;e++)n.push(t[e].x),n.push(t[e].y);return n.join(" ")}setRatios(t){if(t.length!==this.points.length)throw new Error("incorrect number of ratio values");this.ratios=t,this._lut=[]}verify(){const t=this.coordDigest();t!==this._print&&(this._print=t,this.update())}coordDigest(){return this.points.map((function(t,n){return""+n+t.x+t.y+(t.z?t.z:0)})).join("")}update(){this._lut=[],this.dpoints=g.derive(this.points,this._3d),this.computedirection()}computedirection(){const t=this.points,n=g.angle(t[0],t[this.order],t[1]);this.clockwise=n>0}length(){return g.length(this.derivative.bind(this))}static getABC(t=2,n,e,i,o=.5){const r=g.projectionratio(o,t),s=1-r,c={x:r*n.x+s*i.x,y:r*n.y+s*i.y},l=g.abcratio(o,t);return{A:{x:e.x+(e.x-c.x)/l,y:e.y+(e.y-c.y)/l},B:e,C:c,S:n,E:i}}getABC(t,n){n=n||this.get(t);let e=this.points[0],i=this.points[this.order];return M.getABC(this.order,e,n,i,t)}getLUT(t){if(this.verify(),t=t||100,this._lut.length===t)return this._lut;this._lut=[],t--;for(let n,e,i=0;i<t;i++)e=i/(t-1),n=this.compute(e),n.t=e,this._lut.push(n);return this._lut}on(n,e){e=e||5;const i=this.getLUT(),o=[];for(let t,r=0,s=0;r<i.length;r++)t=i[r],g.dist(t,n)<e&&(o.push(t),s+=r/i.length);return!!o.length&&(t/=o.length)}project(t){const n=this.getLUT(),e=n.length-1,i=g.closest(n,t),o=i.mpos,r=(o-1)/e,s=(o+1)/e,c=.1/e;let l,a,u=i.mdist,h=r,p=h;for(u+=1;h<s+c;h+=c)l=this.compute(h),a=g.dist(t,l),a<u&&(u=a,p=h);return p=p<0?0:p>1?1:p,l=this.compute(p),l.t=p,l.d=u,l}get(t){return this.compute(t)}point(t){return this.points[t]}compute(t){return this.ratios?g.computeWithRatios(t,this.points,this.ratios,this._3d):g.compute(t,this.points,this._3d,this.ratios)}raise(){const t=this.points,n=[t[0]],e=t.length;for(let i,o,r=1;r<e;r++)i=t[r],o=t[r-1],n[r]={x:(e-r)/e*i.x+r/e*o.x,y:(e-r)/e*i.y+r/e*o.y};return n[e]=t[e-1],new M(n)}derivative(t){return g.compute(t,this.dpoints[0],this._3d)}dderivative(t){return g.compute(t,this.dpoints[1],this._3d)}align(){let t=this.points;return new M(g.align(t,{p1:t[0],p2:t[t.length-1]}))}curvature(t){return g.curvature(t,this.dpoints[0],this.dpoints[1],this._3d)}inflections(){return g.inflections(this.points)}normal(t){return this._3d?this.__normal3(t):this.__normal2(t)}__normal2(t){const n=this.derivative(t),e=S(n.x*n.x+n.y*n.y);return{x:-n.y/e,y:n.x/e}}__normal3(t){const n=this.derivative(t),e=this.derivative(t+.01),i=S(n.x*n.x+n.y*n.y+n.z*n.z),o=S(e.x*e.x+e.y*e.y+e.z*e.z);n.x/=i,n.y/=i,n.z/=i,e.x/=o,e.y/=o,e.z/=o;const r={x:e.y*n.z-e.z*n.y,y:e.z*n.x-e.x*n.z,z:e.x*n.y-e.y*n.x},s=S(r.x*r.x+r.y*r.y+r.z*r.z);r.x/=s,r.y/=s,r.z/=s;const c=[r.x*r.x,r.x*r.y-r.z,r.x*r.z+r.y,r.x*r.y+r.z,r.y*r.y,r.y*r.z-r.x,r.x*r.z-r.y,r.y*r.z+r.x,r.z*r.z];return{x:c[0]*n.x+c[1]*n.y+c[2]*n.z,y:c[3]*n.x+c[4]*n.y+c[5]*n.z,z:c[6]*n.x+c[7]*n.y+c[8]*n.z}}hull(t){let n=this.points,e=[],i=[],o=0;for(i[o++]=n[0],i[o++]=n[1],i[o++]=n[2],3===this.order&&(i[o++]=n[3]);n.length>1;){e=[];for(let r,s=0,c=n.length-1;s<c;s++)r=g.lerp(t,n[s],n[s+1]),i[o++]=r,e.push(r);n=e}return i}split(t,n){if(0===t&&n)return this.split(n).left;if(1===n)return this.split(t).right;const e=this.hull(t),i={left:2===this.order?new M([e[0],e[3],e[5]]):new M([e[0],e[4],e[7],e[9]]),right:2===this.order?new M([e[5],e[4],e[2]]):new M([e[9],e[8],e[6],e[3]]),span:e};return i.left._t1=g.map(0,0,1,this._t1,this._t2),i.left._t2=g.map(t,0,1,this._t1,this._t2),i.right._t1=g.map(t,0,1,this._t1,this._t2),i.right._t2=g.map(1,0,1,this._t1,this._t2),n?(n=g.map(n,t,1,0,1),i.right.split(n).left):i}extrema(){const t={};let n=[];return this.dims.forEach(function(e){let i=function(t){return t[e]},o=this.dpoints[0].map(i);t[e]=g.droots(o),3===this.order&&(o=this.dpoints[1].map(i),t[e]=t[e].concat(g.droots(o))),t[e]=t[e].filter((function(t){return t>=0&&t<=1})),n=n.concat(t[e].sort(g.numberSort))}.bind(this)),t.values=n.sort(g.numberSort).filter((function(t,e){return n.indexOf(t)===e})),t}bbox(){const t=this.extrema(),n={};return this.dims.forEach(function(e){n[e]=g.getminmax(this,e,t[e])}.bind(this)),n}overlaps(t){const n=this.bbox(),e=t.bbox();return g.bboxoverlap(n,e)}offset(t,n){if(void 0!==n){const e=this.get(t),i=this.normal(t),o={c:e,n:i,x:e.x+i.x*n,y:e.y+i.y*n};return this._3d&&(o.z=e.z+i.z*n),o}if(this._linear){const n=this.normal(0),e=this.points.map((function(e){const i={x:e.x+t*n.x,y:e.y+t*n.y};return e.z&&n.z&&(i.z=e.z+t*n.z),i}));return[new M(e)]}return this.reduce().map((function(n){return n._linear?n.offset(t)[0]:n.scale(t)}))}simple(){if(3===this.order){const t=g.angle(this.points[0],this.points[3],this.points[1]),n=g.angle(this.points[0],this.points[3],this.points[2]);if(t>0&&n<0||t<0&&n>0)return!1}const t=this.normal(0),n=this.normal(1);let e=t.x*n.x+t.y*n.y;return this._3d&&(e+=t.z*n.z),w(k(e))<E/3}reduce(){let t,n,e=0,i=0,o=.01,r=[],s=[],c=this.extrema().values;for(-1===c.indexOf(0)&&(c=[0].concat(c)),-1===c.indexOf(1)&&c.push(1),e=c[0],t=1;t<c.length;t++)i=c[t],n=this.split(e,i),n._t1=e,n._t2=i,r.push(n),e=i;return r.forEach((function(t){for(e=0,i=0;i<=1;)for(i=e+o;i<=1.01;i+=o)if(n=t.split(e,i),!n.simple()){if(i-=o,w(e-i)<o)return[];n=t.split(e,i),n._t1=g.map(e,0,1,t._t1,t._t2),n._t2=g.map(i,0,1,t._t1,t._t2),s.push(n),e=i;break}e<1&&(n=t.split(e,1),n._t1=g.map(e,0,1,t._t1,t._t2),n._t2=t._t2,s.push(n))})),s}scale(t){const n=this.order;let e=!1;if("function"==typeof t&&(e=t),e&&2===n)return this.raise().scale(e);const i=this.clockwise,o=e?e(0):t,r=e?e(1):t,s=[this.offset(0,10),this.offset(1,10)],c=this.points,l=[],a=g.lli4(s[0],s[0].c,s[1],s[1].c);if(!a)throw new Error("cannot scale this curve. Try reducing it first.");return[0,1].forEach((function(t){const e=l[t*n]=g.copy(c[t*n]);e.x+=(t?r:o)*s[t].n.x,e.y+=(t?r:o)*s[t].n.y})),e?([0,1].forEach((function(o){if(2!==n||!o){var r=c[o+1],s={x:r.x-a.x,y:r.y-a.y},u=e?e((o+1)/n):t;e&&!i&&(u=-u);var h=S(s.x*s.x+s.y*s.y);s.x/=h,s.y/=h,l[o+1]={x:r.x+u*s.x,y:r.y+u*s.y}}})),new M(l)):([0,1].forEach((t=>{if(2===n&&t)return;const e=l[t*n],i=this.derivative(t),o={x:e.x+i.x,y:e.y+i.y};l[t+1]=g.lli4(e,o,a,c[t+1])})),new M(l))}outline(t,n,e,i){n=void 0===n?t:n;const o=this.reduce(),r=o.length,s=[];let c,l=[],a=0,u=this.length();const h=void 0!==e&&void 0!==i;function p(t,n,e,i,o){return function(r){const s=i/e,c=(i+o)/e,l=n-t;return g.map(r,0,1,t+s*l,t+c*l)}}o.forEach((function(o){const r=o.length();h?(s.push(o.scale(p(t,e,u,a,r))),l.push(o.scale(p(-n,-i,u,a,r)))):(s.push(o.scale(t)),l.push(o.scale(-n))),a+=r})),l=l.map((function(t){return c=t.points,c[3]?t.points=[c[3],c[2],c[1],c[0]]:t.points=[c[2],c[1],c[0]],t})).reverse();const f=s[0].points[0],y=s[r-1].points[s[r-1].points.length-1],x=l[r-1].points[l[r-1].points.length-1],d=l[0].points[0],w=g.makeline(x,f),b=g.makeline(y,d),v=[w].concat(s).concat([b]).concat(l);return v.length,new m(v)}outlineshapes(t,n,e){n=n||t;const i=this.outline(t,n).curves,o=[];for(let t=1,n=i.length;t<n/2;t++){const r=g.makeshape(i[t],i[n-t],e);r.startcap.virtual=t>1,r.endcap.virtual=t<n/2-1,o.push(r)}return o}intersects(t,n){return t?t.p1&&t.p2?this.lineIntersects(t):(t instanceof M&&(t=t.reduce()),this.curveintersects(this.reduce(),t,n)):this.selfintersects(n)}lineIntersects(t){const n=b(t.p1.x,t.p2.x),e=b(t.p1.y,t.p2.y),i=v(t.p1.x,t.p2.x),o=v(t.p1.y,t.p2.y);return g.roots(this.points,t).filter((t=>{var r=this.get(t);return g.between(r.x,n,i)&&g.between(r.y,e,o)}))}selfintersects(t){const n=this.reduce(),e=n.length-2,i=[];for(let o,r,s,c=0;c<e;c++)r=n.slice(c,c+1),s=n.slice(c+2),o=this.curveintersects(r,s,t),i.push(...o);return i}curveintersects(t,n,e){const i=[];t.forEach((function(t){n.forEach((function(n){t.overlaps(n)&&i.push({left:t,right:n})}))}));let o=[];return i.forEach((function(t){const n=g.pairiteration(t.left,t.right,e);n.length>0&&(o=o.concat(n))})),o}arcs(t){return t=t||.5,this._iterate(t,[])}_error(t,n,e,i){const o=(i-e)/4,r=this.get(e+o),s=this.get(i-o),c=g.dist(t,n),l=g.dist(t,r),a=g.dist(t,s);return w(l-c)+w(a-c)}_iterate(t,n){let e,i=0,o=1;do{e=0,o=1;let r,s,c,l,a,u=this.get(i),h=!1,p=!1,f=o,y=1,x=0;do{if(p=h,l=c,f=(i+o)/2,x++,r=this.get(f),s=this.get(o),c=g.getccenter(u,r,s),c.interval={start:i,end:o},h=this._error(c,u,i,o)<=t,a=p&&!h,a||(y=o),h){if(o>=1){if(c.interval.end=y=1,l=c,o>1){let t={x:c.x+c.r*z(c.e),y:c.y+c.r*_(c.e)};c.e+=g.angle({x:c.x,y:c.y},t,this.get(1))}break}o+=(o-i)/2}else o=f}while(!a&&e++<100);if(e>=100)break;l=l||c,n.push(l),i=y}while(o<1);return n}}function A(t,n){return"number"==typeof t&&isFinite(t)&&t>=0?t:"cell"===n?.5:.24}function O(t,n,e){if("number"==typeof t&&isFinite(t))return{row:e.row,column:e.column+t};if("string"!=typeof t)return"from"===n?{row:e.row,column:e.column}:{row:e.row,column:e.column+1};const[i,o]=t.split(/\s+/,2).map((t=>Number(t??0)));return isFinite(i)&&isFinite(o)?{row:e.row+o,column:e.column+i}:t}function T(t){if("number"==typeof t&&isFinite(t))return{angle:t,strength:1};if(!0===t)return{angle:30,strength:1};if("right"===t)return{angle:-30,strength:1};if("string"!=typeof t)return;let[n,e]=t.split(/\s+/,2).map(Number);return isFinite(n)||(n=0),isFinite(e)||(e=1),{angle:n,strength:e}}function C(t){return"number"==typeof t&&isFinite(t)?t:!0===t?.24:"right"===t?-.24:0}function N(t){return"number"==typeof t&&isFinite(t)&&t>=0?t:.04}function F(t){return"two"===t||"three"===t||"squiggle"===t?t:"one"}function G(t,n,e){return"none"===t?t:"arrow"===t?"three"===e?"arrow3":"two"===e?"arrow2":t:"bar"===t?"three"===e?"bar3":"two"===e?"bar2":t:"harpoon"===t||"-harpoon"===t||"hook"===t||"-hook"===t||"loop"===t||"-loop"===t||"two"===t||"tail"===t?"three"===e||"two"===e?"none":t:"tail"===n?"none":"three"===e?"arrow3":"two"===e?"arrow2":"arrow"}function I(t){return"number"==typeof t&&isFinite(t)?t:"right"===t?-.8:.8}function P(t){return!0===t?t:"string"==typeof t&&(t=t.trim()).length>0&&t.split(/\s+/)}function j(t){return{x:Math.cos(t/180*Math.PI),y:-Math.sin(t/180*Math.PI)}}function B(t){const n=Math.acos(t.x)/Math.PI*180;return t.y<=0?n:360-n}function L(t,n,e){if((t%=360)<0&&(t+=360),0===t)return{x:n.x+e.width/2,y:n.y};if(180===t)return{x:n.x-e.width/2,y:n.y};if(90===t)return{x:n.x,y:n.y-e.top};if(270===t)return{x:n.x,y:n.y+e.bottom};const i=Math.abs(Math.tan(t/180*Math.PI));if(t<90){const t=Math.min(e.width/2,e.top/i),o=Math.min(e.top,e.width*i/2);return{x:n.x+t,y:n.y-o}}if(t<180){const t=Math.min(e.width/2,e.top/i),o=Math.min(e.top,e.width*i/2);return{x:n.x-t,y:n.y-o}}if(t<270){const t=Math.min(e.width/2,e.bottom/i),o=Math.min(e.bottom,e.width*i/2);return{x:n.x-t,y:n.y+o}}const o=Math.min(e.width/2,e.bottom/i),r=Math.min(e.bottom,e.width*i/2);return{x:n.x+o,y:n.y+r}}const q=[5.4,6.5,4.8,3,2,1,0,0],U=[4,7,2,3,-2,1,-5.5,0],R=[1.5,8,-.5,2.5,-5,0],$=[0,0,-2.5,0,-5,0],D=[0,0,-4,0,-4,-5,0,-5],W=[0,-5,3,-5,3,0],J=[3,0,3,2.5,3,5],V=[0,5,0,0,0,-5],Y=[0,7.5,0,0,0,-7.5],H=[0,10,0,0,0,-10];function Z(t,n,e){function i(...t){const i=[],o=Math.floor(t.length/2);for(let s=0;s<o;s++){const o=2*s,{x:c,y:l}=(r={x:t[o],y:t[o+1]},{x:e.x+.04*r.x*n.x-.04*r.y*n.y,y:e.y+.04*r.y*n.x+.04*r.x*n.y});i.push(c,l)}var r;return i}switch(t){case"harpoon":return[new M(i(...q))];case"-harpoon":return[new M(i(...q.map(((t,n)=>n%2==0?t:-t))))];case"arrow":return[new M(i(...q)),new M(i(...q.map(((t,n)=>n%2==0?t:-t))))];case"arrow2":return[new M(i(...U)),new M(i(...U.map(((t,n)=>n%2==0?t:-t))))];case"arrow3":return[new M(i(...R)),new M(i(...R.map(((t,n)=>n%2==0?t:-t)))),new M(i(...$))];case"tail":return[new M(i(...q.map(((t,n)=>n%2==0?-t:t)))),new M(i(...q.map((t=>-t))))];case"two":return[new M(i(...q)),new M(i(...q.map(((t,n)=>n%2==0?t:-t)))),new M(i(...q.map(((t,n)=>n%2==0?t+4.5:t)))),new M(i(...q.map(((t,n)=>n%2==0?t+4.5:-t))))];case"hook":return[new M(i(...D))];case"-hook":return[new M(i(...D.map(((t,n)=>n%2==0?t:-t))))];case"loop":return[new M(i(...D)),new M(i(...W)),new M(i(...J))];case"-loop":return[new M(i(...D.map(((t,n)=>n%2==0?t:-t)))),new M(i(...W.map(((t,n)=>n%2==0?t:-t)))),new M(i(...J.map(((t,n)=>n%2==0?t:-t))))];case"bar":return[new M(i(...V))];case"bar2":return[new M(i(...Y))];case"bar3":return[new M(i(...H))];case"none":return[]}}function Q(t){let n=0;const e=[];for(const i of t){const t=i.length();t>0&&(n+=t,e.push({length:t,bezier:i}))}if(n<1||0===e.length)return t;const i=.25,o=Math.floor(n/i)-1,r=i,s=o*i,c=[];let l,a=0,u=0;for(const{length:t,bezier:n}of e){const e=u+t;if(u<r&&(e<=r?c.push(n):c.push(n.split(0,(r-u)/t))),a<o)for(;;){const r=(a+1)*i;if(r>e)break;const s=n.get((r-u)/t);if(void 0!==l){const t=s.x-l.x,n=s.y-l.y,e=Math.sqrt(t**2+n**2);if(e>0){const i={x:t/e,y:n/e},o={x:(l.x+s.x)/2,y:(l.y+s.y)/2};a%2==1?(o.x+=.1*i.y,o.y-=.1*i.x):(o.x-=.1*i.y,o.y+=.1*i.x),c.push(new M(l.x,l.y,(l.x+o.x)/2,(l.y+o.y)/2,o.x,o.y)),c.push(new M(o.x,o.y,(o.x+s.x)/2,(o.y+s.y)/2,s.x,s.y))}}if(l=s,a++,a===o)break}e>s&&(u>=s?c.push(n):c.push(n.split((s-u)/t,1))),u=e}return c}function X(t,n){const e=document.createElement("div"),i=document.createElement("div"),o=document.createElement("div"),r=document.createElement("div");return e.style.position="absolute",e.style.top="0",e.style.width="0",e.style.display="flex",e.style.justifyContent="center",o.style.display="inline-block",r.style.display="inline-block",r.style.verticalAlign="-0.5ex",r.style.width="max-content",n.after(e),e.append(i),i.append(o),i.append(r),r.append(t),{leftControler:e,topControler:o,container:r}}function K(t,n,e,i){const{height:o,width:r}=t.container.getBoundingClientRect(),s=o*n,c=r*e;t.topControler.style.height=s+"em";const{top:l}=t.topControler.getBoundingClientRect(),{top:a}=t.container.getBoundingClientRect(),u=Math.min(s,(a-l)*n);return{height:s+2*i,width:c+2*i,top:s-u+i,bottom:u+i}}function tt(t,n){t.leftControler.style.left=n.x+"em",t.topControler.style.height=n.y+"em"}function nt(t,n,e){const i=e.base.stringToId(t),o=n[i]=(n[i]??0)+1;return o>1||0===i.length?`${i}~${o}`:i}function et(t,n,e,i,o){const r=[],s={tag:"katex"===n?n:"div",options:{},children:[]};for(const n of t){if(0===n.length){s.children.push(n);continue}const t=n[0];if("string"==typeof t){s.children.push(n);continue}let{at:l,shift:a,margin:u}=t.options,h=t.options["cd-id"];void 0===l&&void 0===a&&void 0===u&&void 0===h?s.children.push(n):("string"!=typeof h&&(h=i.base.unitToInlinePlainString(t)),r.push({at:(c=l,"number"==typeof c&&c>=0&&c<=1?c:.5),shift:I(a),margin:A(u??o.labelMarginOption,"label"),unit:t,id:nt(h,e,i),clear:P(t.options.clear)}))}var c;if(s.children.length>0){const t=i.base.unitToInlinePlainString(s);r.push({at:.5,shift:.8,margin:A(o.labelMarginOption,"label"),unit:s,id:nt(t,e,i),clear:!1})}return r}function it(t,n,e,i,o,{gap:r,cellMargin:s}){i.innerHTML="";const c=[],l=[],a=Number(getComputedStyle(o).fontSize.slice(0,-2));let u=1/a,h=1/a;const p=o.closest("foreignObject");if(null!==p){const{height:t,width:n}=p.getBoundingClientRect();u*=p.height.animVal.value/t,h*=p.width.animVal.value/n}const f={},y={};for(const{element:n,position:e,id:i}of t){const t=K(n,u,h,s);f[e.row+" "+e.column]=t,i.length>0&&(y[i]=t),(c[e.row]??0)<t.height&&(c[e.row]=t.height),(l[e.column]??0)<t.width&&(l[e.column]=t.width)}function x(t){let n=t.column>=0?(l[0]??0)/2:0,e=t.row>=0?(c[0]??0)/2:0;for(let e=1;e<=t.column;e++){const t=l[e-1],i=l[e];void 0!==t&&(n+=t/2,void 0!==i&&(n+=r.column)),void 0!==i&&(n+=i/2)}if(t.column%1!=0){const e=Math.floor(t.column),i=l[e],o=l[e+1];void 0!==i&&(n+=(t.column-e)*i/2,void 0!==o&&(n+=(t.column-e)*r.column)),void 0!==o&&(n+=(t.column-e)*o/2)}for(let n=1;n<=t.row;n++){const t=c[n-1],i=c[n];void 0!==t&&(e+=t/2,void 0!==i&&(e+=r.row)),void 0!==i&&(e+=i/2)}if(t.row%1!=0){const n=Math.floor(t.row),i=c[n],o=c[n+1];void 0!==i&&(e+=(t.row-n)*i/2,void 0!==o&&(e+=(t.row-n)*r.row)),void 0!==o&&(e+=(t.row-n)*o/2)}return{x:n,y:e}}const d={};for(const{position:n,id:e}of t){const t=x(n);e.length>0&&(d[e]=t)}let g=0,m=0,w=x({row:0,column:l.length}).x,b=x({row:c.length,column:0}).y;function v(t,n,e){const i=[];for(const e of t){i.push(e.toSVG());const{x:t,y:o}=e.bbox(),r=t.min-n/2,s=t.max+n/2,c=o.min-n/2,l=o.max+n/2;r<g&&(g=r),s>w&&(w=s),c<m&&(m=c),l>b&&(b=l)}const o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",i.join(" ")),o.style.strokeWidth=n+"px",o.style.fill="none",e.append(o),i}function z(t,n,e,i){const o=t.offset(-e);return Array.isArray(o)?v(o,n,i):[]}function _(t,n,e,i){const o=t.offset(-e);return Array.isArray(o)?v(Q(o),n,i):[]}const k=[],S=[],E=[],A=[];for(const{from:t,to:o,out:r,in:s,bend:c,head:l,tail:a,shift:p,body:S,g:E,labels:O,clear:T,margin:C,width:N}of n){let n,F,G,I,P,q,U,R,$,D;if("string"!=typeof t){n=x(t);const e=f[t.row+" "+t.column];G=void 0===e?{height:0,width:0,top:0,bottom:0}:e}else{const e=d[t],i=y[t];if(void 0===e||void 0===i)continue;n=e,G=i}if("string"!=typeof o){F=x(o);const t=f[o.row+" "+o.column];I=void 0===t?{height:0,width:0,top:0,bottom:0}:t}else{const t=d[o],n=y[o];if(void 0===t||void 0===n)continue;F=t,I=n}if(void 0===r||void 0===s){const t=F.x-n.x,e=F.y-n.y,i=Math.sqrt(t**2+e**2);if(0===i)continue;const o=B({x:t/i,y:e/i});let l=0,a=1;if(void 0!==c&&(l=c.angle,a=c.strength),void 0===r){const t=o+l;P=L(t,n,G),U=j(t),$=a}else P=L(r.angle,n,G),U=j(r.angle),$=r.strength;if(void 0===s){const t=o+180-l;q=L(t,F,I),R=j(t),D=a}else q=L(s.angle,F,I),R=j(s.angle),D=s.strength}else P=L(r.angle,n,G),q=L(s.angle,F,I),U=j(r.angle),R=j(s.angle),$=r.strength,D=s.strength;"arrow2"!==l&&"arrow3"!==l&&"hook"!==l&&"-hook"!==l&&"loop"!==l&&"-loop"!==l&&"tail"!==l||(q.x=q.x+.16*R.x,q.y=q.y+.16*R.y),"arrow2"!==a&&"arrow3"!==a&&"hook"!==a&&"-hook"!==a&&"loop"!==a&&"-loop"!==a&&"tail"!==a||(P.x=P.x+.16*U.x,P.y=P.y+.16*U.y);const W=Math.sqrt((q.x-P.x)**2+(q.y-P.y)**2);if(0===W)continue;const J={x:P.x+U.x*W/3*$,y:P.y+U.y*W/3*$},V={x:q.x+R.x*W/3*D,y:q.y+R.y*W/3*D},Y=new M(P.x,P.y,J.x,J.y,V.x,V.y,q.x,q.y);E.innerHTML="",i.append(E);const H=[];let Q=!1;"three"===S?(H.push(...z(Y,N,p+.2,E)),H.push(...z(Y,N,p,E)),H.push(...z(Y,N,p-.2,E))):"two"===S?(H.push(...z(Y,N,p+.1,E)),H.push(...z(Y,N,p-.1,E))):"squiggle"===S?H.push(..._(Y,N,p,E)):(H.push(...z(Y,N,p,E)),Q=!0);{const t=Z(l,R,{x:q.x-R.y*p,y:q.y+R.x*p});t.length>0&&(H.push(...v(t,N,E)),Q=!1)}{const t=Z(a,U,{x:P.x+U.y*p,y:P.y-U.x*p});t.length>0&&(H.push(...v(t,N,E)),Q=!1)}if(!1!==T&&H.length>0&&A.push({data:{type:"path",drawString:H.join(" "),width:2*C+N},clear:!0===T?k.length:T}),Q){const t=document.createElementNS("http://www.w3.org/2000/svg","rect");t.setAttribute("x","0"),t.setAttribute("y","0"),t.setAttribute("width",N.toString()),t.setAttribute("height",N.toString()),t.style.stroke=t.style.fill="none",E.append(t)}k.push(E);for(const{at:t,shift:n,id:i,clear:o,margin:r}of O){const s=Y.get(t),c=Y.normal(t);let l=p+n;0!==n&&("three"===S?l+=.2*Math.sign(n):"two"!==S&&"squiggle"!==S||(l+=.1*Math.sign(n)));const a={x:s.x-c.x*l,y:s.y-c.y*l};d[i]=a;const f=e[i];if(void 0===f)throw new Error;const x=K(f,u,h,r);y[i]=x;const v=a.x-x.width/2,z=a.x+x.width/2,_=a.y-x.top,E=a.y+x.bottom;v<g&&(g=v),z>w&&(w=z),_<m&&(m=_),E>b&&(b=E),!1!==o&&A.push({data:{type:"box",x:v.toString(),y:_.toString(),width:x.width.toString(),height:x.height.toString()},clear:!0===o?k.length:o})}}A.forEach((function({data:t,clear:n}){for(let e=0;e<k.length;e++){const o=k[e];t:{if("number"!=typeof n){for(const t of n)if(o.classList.contains(t))break t;continue}if(e>=n)break}let r=S[e];if(void 0===r){r=S[e]=document.createElementNS("http://www.w3.org/2000/svg","mask");const t=document.createElementNS("http://www.w3.org/2000/svg","rect");t.style.fill="white",i.append(r),r.append(t),E.push(t);const n=Math.random().toString();r.id=n,o.style.mask=`url(#${n})`}if("path"===t.type){const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.style.strokeWidth=t.width+"px",n.style.stroke="black",n.style.fill="none",n.setAttribute("d",t.drawString),r.append(n);continue}const s=document.createElementNS("http://www.w3.org/2000/svg","rect");s.style.stroke="none",s.style.fill="black",s.setAttribute("x",t.x),s.setAttribute("y",t.y),s.setAttribute("width",t.width),s.setAttribute("height",t.height),r.append(s)}}));const O=w-g,T=b-m;o.style.width=i.style.width=O+"em",o.style.height=i.style.height=T+"em",i.setAttribute("viewBox",`${g} ${m} ${O} ${T}`);for(const{element:n,position:e}of t){const t=x(e);tt(n,{x:t.x-g,y:t.y-m})}for(const t of Object.keys(e)){const n=e[t],i=d[t];void 0!==n&&void 0!==i&&tt(n,{x:i.x-g,y:i.y-m})}for(const t of E)t.setAttribute("x",g.toString()),t.setAttribute("y",m.toString()),t.setAttribute("width",O.toString()),t.setAttribute("height",T.toString())}const ot=async(t,n)=>{const e="number"==typeof(i=t.options["draw-delay"]??n.extractor.extractLastGlobalOption("draw-delay","cd",n.context.tagToGlobalOptions))&&isFinite(i)&&i>=0?1e3*i:0;var i;const o=function(t){return"number"==typeof t&&isFinite(t)&&t>=1&&t%1==0?t:1}(t.options["draw-num"]??n.extractor.extractLastGlobalOption("draw-num","cd",n.context.tagToGlobalOptions)),r=function(t){if("number"==typeof t&&isFinite(t))return{row:t,column:t};if("string"==typeof t){let[n,e]=t.split(/\s+/,2).map(Number);return(!isFinite(n)||n<0)&&(n=2.4),(!isFinite(e)||e<0)&&(e=1.8),{row:e,column:n}}return{row:1.8,column:2.4}}(t.options.gap??n.extractor.extractLastGlobalOption("gap","cd",n.context.tagToGlobalOptions)),s=A(t.options["cell-margin"]??n.extractor.extractLastGlobalOption("cell-margin","cd",n.context.tagToGlobalOptions),"cell"),c=document.createElement("div"),l=document.createElementNS("http://www.w3.org/2000/svg","svg");c.classList.add("cd"),c.style.position="relative",l.style.position="absolute",l.style.left="0",l.style.top="0",c.append(l);let a={children:[],id:""},u=[a];const h=[u],p=[],f={};for(const e of t.children)if(0!==e.length){{const i=e[0];if("string"!=typeof i){if("ar"===i.tag||"katex"===i.tag&&!0===i.options.ar){const e={row:h.length-1,column:u.length-1},o=F(i.options.body),r=et(i.children,i.tag,f,n,{labelMarginOption:t.options["label-margin"]??n.extractor.extractLastGlobalOption("label-margin","cd",n.context.tagToGlobalOptions)}),s=document.createElementNS("http://www.w3.org/2000/svg","g");if("string"==typeof i.options.class&&i.options.class.length>0)try{s.setAttribute("class",i.options.class)}catch(t){console.log(t)}if("string"==typeof i.options.style&&i.options.style.length>0)try{s.setAttribute("style",i.options.style)}catch(t){console.log(t)}if("string"==typeof i.options.slide&&i.options.slide.length>0)try{s.dataset.slide=i.options.slide}catch(t){console.log(t)}l.append(s),p.push({from:O(i.options.from,"from",e),to:O(i.options.to,"to",e),out:T(i.options.out),in:T(i.options.in),bend:T(i.options.bend),shift:C(i.options.shift),margin:A(i.options.margin??t.options["arrow-margin"]??n.extractor.extractLastGlobalOption("arrow-margin","cd",n.context.tagToGlobalOptions),"arrow"),width:N(i.options.width??t.options["arrow-width"]??n.extractor.extractLastGlobalOption("arrow-width","cd",n.context.tagToGlobalOptions)),body:o,head:G(i.options.head,"head",o),tail:G(i.options.tail,"tail",o),labels:r,g:s,clear:P(i.options.clear)});continue}}else{if("&"===i&&1===e.length){u.push(a={children:[],id:""});continue}if("\\"===i&&2===e.length&&"\\"===e[1]){h.push(u=[a={children:[],id:""}]);continue}}}if(a.children.push(e),0===a.id.length){const t=n.base.lineToInlinePlainString(e);t.length>0&&(a.id=nt(t,f,n))}}else a.children.push(e);const y={},x=[];for(let e=0;e<h.length;e++){const i=h[e];for(let o=0;o<i.length;o++){const{children:r,id:s}=i[o];0!==r.length&&(x.push({element:X("CD"===t.tag?await n.compileUnit({tag:"katex",options:{},children:r}):await n.compileSTDN(r),l),position:{row:e,column:o},id:s}),s.length>0&&(y[s]=!0))}}const d={},g=[];let m,w,b=p;for(;;){const t=[];for(const e of b){const{from:i,to:o}=e;if("string"!=typeof i||y[i])if("string"!=typeof o||y[o]){g.push(e);for(const{unit:t,id:i}of e.labels){const e=X(await n.compileUnit(t),l);!0!==t.options["normal-font-size"]&&(e.container.style.fontSize="var(--length-font-log)"),d[i]=e,y[i]=!0}}else t.push(e);else t.push(e)}if(b.length===t.length)break;b=t}let v=!1;const z=async()=>{if(c.isConnected&&!v){v=!0,void 0!==m&&m.disconnect(),void 0!==w&&clearInterval(w),await new Promise((t=>setTimeout(t,e)));for(let t=0;t<o;t++)it(x,g,d,l,c,{gap:r,cellMargin:s}),await new Promise((t=>setTimeout(t,1e3)))}};return m=new MutationObserver(z),w=window.setInterval(z,1e3),m.observe(document.body,{childList:!0,subtree:!0}),c},rt=ot;var st=e.CD,ct=e.W7,lt=e.aC,at=e.cd,ut=e.ib,ht=e.Zg,pt=e.rY,ft=e.in,yt=e.$U,xt=e.AY;export{st as CD,ct as absoluteElementToBox,lt as angleToD,at as cd,ut as createAbsoluteElement,ht as createArrowMark,pt as dToAngle,ft as getEdgePoint,yt as piecesToSquiggle,xt as placeAbsoluteElement};

(function() {

// ── AUTH STATE ───────────────────────────────────────────────────────────────
var showAuth = true;
var authMode = "signup"; // "signup" | "login"
var A = {email:"", password:"", confirmPwd:"", showPwd:false, error:"", loading:false};

// ── WIZARD STATE ─────────────────────────────────────────────────────────────
var STEPS=[
  {id:"basic",req:true,logo:true,title:"Let's get to know you.",desc:"Import from LinkedIn or your resume, or fill in manually.",hero:"Your expertise is somebody's breakthrough. Thousands of founders are searching for exactly what you've spent years building."},
  {id:"industry",req:true,logo:false,title:"What's your primary industry?",desc:"Select the industry where you have the deepest expertise.",hero:"Specificity is your superpower. The most impactful advisors aren't generalists — the clearer you are about your domain, the better we match you."},
  {id:"role",req:true,logo:false,title:"What type of engagements are you open to?",desc:"Select all that apply.",hero:"Advisors who know their role get more calls. Founders scan for specific functions first."},
  {id:"skills",req:true,logo:false,title:"What are your core skills?",desc:"Add the specific skills you can help founders with.",hero:"Every skill is a problem solved for a founder. The more precise your skills, the better we match you."},
  {id:"experience",req:true,logo:false,title:"Tell us about your experience.",desc:"Your background helps founders understand the calibre of advice they're getting.",hero:"Every year of experience is a shortcut for someone else. Founders hire fractional advisors to compress time."},
  {id:"verify",req:false,logo:false,title:"Verify your identity.",desc:"Verified advisors get 3× more engagement from founders.",hero:"Trust is the foundation of advice. A quick verification protects both you and the founders who rely on your guidance."},
  {id:"social",req:false,logo:false,title:"Profile photo & social links.",desc:"A strong photo and active LinkedIn turn a search result into a booked call.",hero:"First impressions happen before hello. Founders research you before they ever reach out."},
  {id:"limits",req:false,logo:false,title:"Set your non-negotiables.",desc:"These appear on your profile so the right founders find you — and the wrong ones never waste your time.",hero:"Great advisors know their best fit. Being clear about what you won't do is just as valuable as what you will."},
];
var INDUSTRIES=["SaaS & Technology","Healthcare & MedTech","Fintech & Financial Services","Manufacturing & Operations","E-commerce & Retail","Legal & Professional Services","Climate & CleanTech","Other"];
var ROLES=["Advisor","Board Member","Fractional CEO","Fractional CFO","Fractional CTO","Fractional COO","Fractional CMO","Fractional CPO","Fractional CHRO","Mentor","Coach"];
var SKILL_SUGS=["Financial Strategy","Fundraising","M&A","IPO Readiness","Go-to-Market","Product Strategy","Revenue Growth","Operational Efficiency","Sales","Team Building","Pricing","Investor Relations"];
var cur=0;
var S={fn:"",ln:"",headline:"",bio:"",industry:"",roles:["Advisor"],skills:["Financial Strategy","Fundraising"],yrs:"",prevRoles:"",highlights:"",verifyM:"none",dlOk:false,resumeOk:false,otpPhone:"",otpSent:false,otpCode:["","","","","",""],otpVerified:false,otpError:"",otpResendIn:0,photo:"",linkedin:"",twitter:"",website:"",city:"",travel:"occasional",minEng:"",maxClients:"3",restrictions:""};

// ── AUTH FUNCTIONS ───────────────────────────────────────────────────────────
function renderAuthScreen() {
  document.getElementById("heroText").textContent = authMode === "signup"
    ? "The best advisors aren't looking for work — they're selectively choosing the founders worth their time."
    : "Welcome back. Your matches and profile are waiting for you.";
  document.getElementById("rDots").innerHTML = "";
  document.getElementById("logoRow").style.display = "inline-flex";
  document.getElementById("stepCounter").textContent = "";
  document.getElementById("progressFill").style.width = "0%";
  document.getElementById("btnPrev").className = "btn-prev invisible";
  document.getElementById("btnSkip").style.display = "none";
  document.getElementById("btnNext").style.display = "none";
  var rf = document.querySelector(".r-footer");
  if (rf) rf.style.display = "none";
  document.getElementById("stepContent").innerHTML = buildAuthForm();
  setTimeout(function() {
    var emailEl = document.getElementById("authEmail");
    if (emailEl) emailEl.focus();
  }, 60);
}

function buildAuthForm() {
  var isSignup = authMode === "signup";
  var googleSVG = '<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.712A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.712V4.956H.957A9 9 0 0 0 0 9c0 1.452.348 2.827.957 4.044l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.575c1.319 0 2.504.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.956l3.007 2.332C4.672 5.159 6.656 3.575 9 3.575z" fill="#EA4335"/></svg>';
  var chevronSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
  var pwdType = A.showPwd ? "text" : "password";
  var confirmField = isSignup
    ? '<div class="field"><label class="field-label">Confirm password</label><div class="pwd-wrap"><input class="field-input" id="authConfirmPwd" type="'+pwdType+'" placeholder="Re-enter your password" value="'+e(A.confirmPwd)+'" oninput="A.confirmPwd=this.value" onkeydown="if(event.key===\'Enter\')submitAuth()" autocomplete="new-password"/></div></div>'
    : "";
  var forgotLink = !isSignup
    ? '<div style="text-align:right;margin-top:-.5rem"><button class="resend-link" onclick="forgotPassword()" type="button">Forgot password?</button></div>'
    : "";
  var submitLabel = A.loading
    ? '<span style="opacity:.65">Please wait...</span>'
    : (isSignup ? "Create account" : "Sign in") + chevronSVG;

  return '<h2 class="step-title">'+(isSignup ? "Create your account" : "Welcome back")+'</h2>'
    +'<p class="step-desc">'+(isSignup ? "Join CXOwork and get matched with founders who need your expertise." : "Sign in to continue building your advisor profile.")+'</p>'
    +'<button class="btn-google" onclick="signInWithGoogle()" type="button">'+googleSVG+'Continue with Google</button>'
    +'<div class="auth-divider"><span>or</span></div>'
    +'<div class="field"><label class="field-label">Email address</label>'
      +'<input class="field-input" id="authEmail" type="email" placeholder="you@example.com" value="'+e(A.email)+'" oninput="A.email=this.value" onkeydown="if(event.key===\'Enter\')submitAuth()" autocomplete="email"/>'
    +'</div>'
    +'<div class="field"><label class="field-label">Password</label><div class="pwd-wrap">'
      +'<input class="field-input" id="authPwd" type="'+pwdType+'" placeholder="'+(isSignup ? "At least 8 characters" : "Your password")+'" value="'+e(A.password)+'" oninput="A.password=this.value" onkeydown="if(event.key===\'Enter\')submitAuth()" autocomplete="'+(isSignup ? "new-password" : "current-password")+'"/>'
      +'<button class="pwd-toggle" onclick="A.showPwd=!A.showPwd;document.getElementById(\'stepContent\').innerHTML=buildAuthForm();setTimeout(function(){var p=document.getElementById(\'authPwd\');if(p)p.focus();},10);" type="button">'+(A.showPwd ? "Hide" : "Show")+'</button>'
    +'</div></div>'
    +confirmField
    +forgotLink
    +(A.error ? '<div class="auth-error">'+e(A.error)+'</div>' : "")
    +'<button class="btn-next auth-submit" onclick="submitAuth()" type="button"'+(A.loading ? " disabled" : "")+'>'+submitLabel+'</button>'
    +(isSignup ? '<p class="terms-note">By creating an account you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>' : "")
    +'<div class="auth-switch">'+(isSignup ? "Already have an account?" : "New here?")+'&nbsp;<button onclick="toggleAuthMode()" type="button">'+(isSignup ? "Sign in" : "Create account")+'</button></div>';
}

window.toggleAuthMode = function() {
  authMode = authMode === "signup" ? "login" : "signup";
  A.error = "";
  renderAuthScreen();
};

window.signInWithGoogle = function() {
  // Placeholder — will connect to Firebase Auth (Google provider) in the backend app
  A.loading = true;
  document.getElementById("stepContent").innerHTML = buildAuthForm();
  setTimeout(function() {
    A.loading = false;
    showAuth = false;
    render();
  }, 900);
};

window.submitAuth = function() {
  var isSignup = authMode === "signup";
  if (!A.email || !A.password) {
    A.error = "Please fill in all fields.";
    document.getElementById("stepContent").innerHTML = buildAuthForm();
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(A.email)) {
    A.error = "Please enter a valid email address.";
    document.getElementById("stepContent").innerHTML = buildAuthForm();
    return;
  }
  if (isSignup && A.password.length < 8) {
    A.error = "Password must be at least 8 characters.";
    document.getElementById("stepContent").innerHTML = buildAuthForm();
    return;
  }
  if (isSignup && A.password !== A.confirmPwd) {
    A.error = "Passwords don't match.";
    document.getElementById("stepContent").innerHTML = buildAuthForm();
    return;
  }
  A.error = "";
  A.loading = true;
  document.getElementById("stepContent").innerHTML = buildAuthForm();
  // Placeholder — will connect to Firebase Auth (email/password) in the backend app
  setTimeout(function() {
    A.loading = false;
    showAuth = false;
    render();
  }, 800);
};

window.forgotPassword = function() {
  if (!A.email) {
    A.error = "Enter your email address above first.";
    document.getElementById("stepContent").innerHTML = buildAuthForm();
    return;
  }
  alert("If an account exists for " + A.email + ", you'll receive a password reset link shortly.");
};

// ── WIZARD FUNCTIONS ─────────────────────────────────────────────────────────
window.goNext=function(){cur<STEPS.length-1?cur++:finish();render();};
window.goBack=function(){if(cur>0){cur--;render();}};
function finish(){document.querySelector(".left").style.display="none";document.getElementById("successPanel").classList.add("show");}
function render(){
  if (showAuth) { renderAuthScreen(); return; }
  // Restore nav elements hidden during auth
  document.getElementById("btnNext").style.display = "";
  var rf = document.querySelector(".r-footer");
  if (rf) rf.style.display = "";
  // Standard wizard render
  var s=STEPS[cur];document.getElementById("logoRow").style.display=s.logo?"inline-flex":"none";document.getElementById("stepCounter").textContent="Step "+(cur+1)+" of "+STEPS.length;document.getElementById("progressFill").style.width=((cur+1)/STEPS.length*100).toFixed(1)+"%";var prev=document.getElementById("btnPrev");prev.className=cur===0?"btn-prev invisible":"btn-prev";var skip=document.getElementById("btnSkip");skip.style.display=(!s.req&&cur<STEPS.length-1)?"inline":"none";var nxt=document.getElementById("btnNext");var lbl=cur===STEPS.length-1?"Complete profile":"Next";nxt.innerHTML=lbl+'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';document.getElementById("stepContent").innerHTML=buildForm(s.id);document.getElementById("heroText").textContent=s.hero;buildDots();document.querySelector(".left").scrollTop=0;
}
function buildDots(){document.getElementById("rDots").innerHTML=STEPS.map(function(_,i){return'<div class="r-dot '+(i<cur?"past":i===cur?"active":"future")+'"></div>';}).join("");}
function e(s){return String(s||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");}
function buildForm(id){switch(id){
case"basic":return'<h2 class="step-title">'+e(STEPS[0].title)+'</h2><div class="import-card li" onclick="fakeLI()"><div class="import-icon" style="background:#0077B5"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></div><div style="flex:1"><div class="import-title">Import from LinkedIn</div><div class="import-sub">Auto-fill your bio, headline, and experience</div></div><div class="import-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></div></div><div class="import-card" onclick="document.getElementById(\'resumeFile\').click()"><div class="import-icon" style="background:hsl(0 0% 96.1%)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(0 0% 45.1%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg></div><div style="flex:1"><div class="import-title">'+(S.resumeOk?'<span style="color:#16a34a">✓ Resume uploaded</span>':"Upload your resume")+'</div><div class="import-sub">PDF, DOC, or DOCX</div></div><div class="import-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></div></div><div class="or-row"><span>or fill in manually</span></div><div class="grid2"><div class="field"><label class="field-label">First name <span class="req">*</span></label><input class="field-input" id="fFn" type="text" value="'+e(S.fn)+'" placeholder="Sarah" oninput="S.fn=this.value"/></div><div class="field"><label class="field-label">Last name <span class="req">*</span></label><input class="field-input" id="fLn" type="text" value="'+e(S.ln)+'" placeholder="Chen" oninput="S.ln=this.value"/></div></div><div class="field"><label class="field-label">Professional headline <span class="req">*</span></label><input class="field-input" type="text" value="'+e(S.headline)+'" placeholder="e.g. Fractional CFO · ex-Goldman · 3 IPOs" oninput="S.headline=this.value"/></div><div class="field"><label class="field-label">Bio <span class="req">*</span></label><textarea class="field-textarea" rows="4" placeholder="Write 2–3 sentences about what you do and who you help best..." oninput="S.bio=this.value;document.getElementById(\'bc\').textContent=this.value.length+\'/500\'">'+e(S.bio)+'</textarea><div class="char-count"><span id="bc">'+S.bio.length+'/500</span></div></div>';
case"industry":return'<h2 class="step-title">'+e(STEPS[1].title)+'</h2><div class="option-grid">'+INDUSTRIES.map(function(ind){return'<button class="opt-card'+(S.industry===ind?" on":"")+'" onclick="S.industry=\''+e(ind)+'\';renderIndustry()">'+ind+'</button>';}).join("")+'</div>';
case"role":return'<h2 class="step-title">'+e(STEPS[2].title)+'</h2><p class="step-desc">Select all that apply</p><div class="pills-wrap" id="rolePills">'+ROLES.map(function(r){return'<button class="pill'+(S.roles.includes(r)?" on":"")+'" onclick="toggleArr(\'roles\',\''+e(r)+'\');renderRoles()">'+r+'</button>';}).join("")+'</div>';
case"skills":return'<h2 class="step-title">'+e(STEPS[3].title)+'</h2><div class="skill-tags" id="skillTags">'+buildSkillTags()+'</div><div class="skill-input-row"><input class="field-input" id="skillIn" type="text" placeholder="Add a skill..." onkeydown="if(event.key===\'Enter\'){event.preventDefault();addSkill();}"/><button class="skill-add" onclick="addSkill()">+</button></div><div class="skill-sugs">'+buildSkillSugs()+'</div>';
case"experience":return'<h2 class="step-title">'+e(STEPS[4].title)+'</h2><div class="field"><label class="field-label">Years of professional experience <span class="req">*</span></label><div class="yrs-grid" id="yrsGrid">'+["1–3","4–7","8–12","13–20","20+"].map(function(y){return'<button class="yr-btn'+(S.yrs===y?" on":"")+'" onclick="S.yrs=\''+y+'\';renderYrs()">'+y+'<br><span style="font-size:.7rem;font-weight:400">yrs</span></button>';}).join("")+'</div></div><div class="field"><label class="field-label">Previous roles & companies <span class="req">*</span></label><textarea class="field-textarea" rows="3" placeholder="e.g. CFO at Stripe (2018–2022)..." oninput="S.prevRoles=this.value">'+e(S.prevRoles)+'</textarea></div><div class="field"><label class="field-label">Career highlights <span class="opt">Optional</span></label><textarea class="field-textarea" rows="3" placeholder="e.g. Led Series B ($45M), grew ARR from $2M to $25M..." oninput="S.highlights=this.value">'+e(S.highlights)+'</textarea></div>';
case"verify":return buildVerifyForm();
case"social":return'<h2 class="step-title">'+e(STEPS[6].title)+'</h2><div class="field"><label class="field-label">Profile photo <span class="opt">Optional</span></label><div class="photo-row"><div class="photo-box" id="photoBox" onclick="document.getElementById(\'photoFile\').click()">'+(S.photo?'<img src="'+S.photo+'" style="width:100%;height:100%;object-fit:cover"/>':"<svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='hsl(0 0% 45.1%)' stroke-width='1.5' stroke-linecap='round'><circle cx='12' cy='8' r='4'/><path d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/></svg>")+'</div><div><button class="btn-file" onclick="document.getElementById(\'photoFile\').click()">Upload photo</button><p class="step-desc" style="margin-top:.375rem;font-size:.75rem">JPG, PNG or WebP · Max 5MB</p></div></div></div><div class="field"><label class="field-label">LinkedIn profile <span class="opt">Optional</span></label><div class="prefix-wrap"><div class="prefix">linkedin.com/in/</div><input class="field-input" type="text" placeholder="sarah-chen" value="'+e(S.linkedin)+'" oninput="S.linkedin=this.value" style="border-radius:0 calc(var(--radius) - 2px) calc(var(--radius) - 2px) 0"/></div></div><div class="field"><label class="field-label">Twitter / X <span class="opt">Optional</span></label><div class="prefix-wrap"><div class="prefix">x.com/</div><input class="field-input" type="text" placeholder="sarahchen" value="'+e(S.twitter)+'" oninput="S.twitter=this.value" style="border-radius:0 calc(var(--radius) - 2px) calc(var(--radius) - 2px) 0"/></div></div><div class="field"><label class="field-label">Personal website <span class="opt">Optional</span></label><input class="field-input" type="url" placeholder="https://sarahchen.com" value="'+e(S.website)+'" oninput="S.website=this.value"/></div>';
case"limits":return'<h2 class="step-title">'+e(STEPS[7].title)+'</h2><div class="notice-blue">These appear on your public profile so the right founders find you.</div><div class="field"><label class="field-label">Your location <span class="opt">Optional</span></label><input class="field-input" type="text" placeholder="e.g. San Francisco, CA" value="'+e(S.city)+'" oninput="S.city=this.value"/></div><div class="field"><label class="field-label">Travel appetite</label><div class="travel-grid">'+[{v:"none",l:"Remote only",d:"No in-person"},{v:"occasional",l:"Occasional",d:"1–2× per quarter"},{v:"frequent",l:"Open to travel",d:"As needed"}].map(function(o){return'<button class="travel-btn'+(S.travel===o.v?" on":"")+'" onclick="S.travel=\''+o.v+'\';renderTravel()"><div class="travel-title">'+o.l+'</div><div class="travel-sub">'+o.d+'</div></button>';}).join("")+'</div></div><div class="grid2"><div class="field"><label class="field-label">Min. engagement (hrs/mo)</label><select class="field-select" onchange="S.minEng=this.value"><option value="" '+(S.minEng?"":"selected")+'>No minimum</option>'+["4 hrs","8 hrs","12 hrs","20 hrs","40 hrs"].map(function(v){return'<option '+(S.minEng===v?"selected":"")+'>'+v+'</option>';}).join("")+'</select></div><div class="field"><label class="field-label">Max. active clients</label><select class="field-select" onchange="S.maxClients=this.value">'+["1","2","3","4","5","6+"].map(function(v){return'<option '+(S.maxClients===v?"selected":"")+'>'+v+'</option>';}).join("")+'</select></div></div><div class="field"><label class="field-label">Other restrictions <span class="opt">Optional</span></label><textarea class="field-textarea" rows="3" placeholder="e.g. I don\'t work with gambling or tobacco companies..." oninput="S.restrictions=this.value">'+e(S.restrictions)+'</textarea></div>';
}return"";}

function buildVerifyForm(){var otpPhoneDigits=S.otpPhone.replace(/\D/g,"");return'<h2 class="step-title">'+e(STEPS[5].title)+'</h2><div class="vc'+(S.verifyM==="otp"?" on":"")+'" id="vc_otp" onclick="setVerify(\'otp\')"><div class="vc-row"><div class="radio"><div class="radio-dot"></div></div><div style="flex:1"><div class="vc-title">Verify with phone number</div><div class="vc-desc">We\'ll send a one-time code to your mobile number — takes 30 seconds.</div>'+(S.verifyM==="otp"?buildOTPArea():"")+'</div></div></div><div class="vc'+(S.verifyM==="dl"?" on":"")+'" id="vc_dl" onclick="setVerify(\'dl\')"><div class="vc-row"><div class="radio"><div class="radio-dot"></div></div><div style="flex:1"><div class="vc-title">Upload a government ID</div><div class="vc-desc">Driver\'s license or passport — verified within 24 hrs, never shared with clients.</div>'+(S.verifyM==="dl"?'<div class="vc-action" onclick="event.stopPropagation()">'+(S.dlOk?'<div class="upload-ok"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5L5.5 10L11 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Document uploaded</div>':'<button class="btn-file" onclick="document.getElementById(\'dlFile\').click()">Choose file...</button>')+'</div>':"")+'</div></div></div><div class="vc'+(S.verifyM==="linkedin"?" on":"")+'" id="vc_li" onclick="setVerify(\'linkedin\')"><div class="vc-row"><div class="radio"><div class="radio-dot"></div></div><div style="flex:1"><div class="vc-title">Connect LinkedIn</div><div class="vc-desc">Verify identity and pull your professional history automatically.</div>'+(S.verifyM==="linkedin"?'<div class="vc-action" onclick="event.stopPropagation()"><button class="btn-li-connect">Connect LinkedIn</button></div>':"")+'</div></div></div><div class="vc'+(S.verifyM==="none"?" on":"")+'" id="vc_none" onclick="setVerify(\'none\')"><div class="vc-row"><div class="radio"><div class="radio-dot"></div></div><div><div class="vc-title">Skip for now</div><div class="vc-desc">Unverified profiles receive fewer match requests.</div></div></div></div>';}

function buildOTPArea(){if(S.otpVerified)return'<div class="vc-action" onclick="event.stopPropagation()"><div class="otp-verified"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#16a34a"/><path d="M4.5 8L7 10.5L11.5 6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Phone number verified</div></div>';
if(!S.otpSent)return'<div class="vc-action" onclick="event.stopPropagation()"><div style="display:flex;flex-direction:column;gap:.625rem;margin-top:.125rem"><div class="phone-row"><button class="phone-dial" type="button">🇺🇸 +1</button><input class="field-input phone-input" id="otpPhone" type="tel" placeholder="(555) 000-0000" value="'+e(S.otpPhone)+'" oninput="S.otpPhone=this.value;updateSendBtn()" onkeydown="if(event.key===\'Enter\'){event.preventDefault();sendOTP();}"/></div><button class="btn-send-otp" id="btnSendOtp" onclick="sendOTP()" '+(S.otpPhone.replace(/\D/g,"").length<10?"disabled":"")+'>Send verification code</button></div></div>';
return'<div class="vc-action" onclick="event.stopPropagation()"><div style="display:flex;flex-direction:column;gap:.75rem;margin-top:.25rem"><div style="font-size:.8125rem;color:hsl(var(--muted-foreground))">Code sent to <strong style="color:hsl(var(--foreground))">'+e(S.otpPhone)+'</strong> <button class="resend-link" style="margin-left:.375rem" onclick="resetOTP()">Change</button></div><div class="otp-boxes" id="otpBoxes">'+[0,1,2,3,4,5].map(function(i){return'<input class="otp-box'+(S.otpCode[i]?" filled":"")+'" id="otp'+i+'" type="text" inputmode="numeric" maxlength="1" value="'+e(S.otpCode[i])+'" oninput="otpInput(event,'+i+')" onkeydown="otpKeydown(event,'+i+')" onpaste="otpPaste(event)"/>';}).join("")+'</div>'+(S.otpError?'<div style="font-size:.8125rem;color:hsl(0 84.2% 60.2%)">'+e(S.otpError)+'</div>':'')+'<button class="btn-verify-otp" onclick="verifyOTP()" '+(S.otpCode.join("").length<6?"disabled":"")+'>Verify code</button><div class="resend-row">Didn\'t receive it? '+(S.otpResendIn>0?'<span>Resend in <strong id="resendTimer">'+S.otpResendIn+'s</strong></span>':'<button class="resend-link" onclick="resendOTP()">Resend code</button>')+'</div></div></div>';}

window.toggleArr=function(k,v){S[k].includes(v)?S[k]=S[k].filter(function(x){return x!==v;}):S[k].push(v);};
window.renderRoles=function(){document.querySelectorAll("#rolePills .pill").forEach(function(p){p.classList.toggle("on",S.roles.includes(p.textContent.trim()));});};
window.renderIndustry=function(){document.querySelectorAll(".opt-card").forEach(function(c){c.classList.toggle("on",c.textContent.trim()===S.industry);});};
window.renderYrs=function(){document.querySelectorAll(".yr-btn").forEach(function(b){b.classList.toggle("on",b.textContent.trim().startsWith(S.yrs));});};
window.renderTravel=function(){var m={none:"Remote only",occasional:"Occasional",frequent:"Open to travel"};document.querySelectorAll(".travel-btn").forEach(function(b){b.classList.toggle("on",b.querySelector(".travel-title").textContent.trim()===m[S.travel]);});};
function buildSkillTags(){return S.skills.map(function(s){return'<span class="skill-tag">'+e(s)+'<button class="skill-rm" onclick="removeSkill(\''+e(s)+'\')">×</button></span>';}).join("");}
function buildSkillSugs(){return SKILL_SUGS.filter(function(s){return!S.skills.includes(s);}).slice(0,7).map(function(s){return'<button class="skill-sug" onclick="addSkillN(\''+e(s)+'\')">+ '+s+'</button>';}).join("");}
window.removeSkill=function(s){S.skills=S.skills.filter(function(x){return x!==s;});document.getElementById("skillTags").innerHTML=buildSkillTags();var sw=document.querySelector(".skill-sugs");if(sw)sw.innerHTML=buildSkillSugs();};
window.addSkill=function(){var i=document.getElementById("skillIn");var v=i.value.trim();if(v&&!S.skills.includes(v)){S.skills.push(v);document.getElementById("skillTags").innerHTML=buildSkillTags();var sw=document.querySelector(".skill-sugs");if(sw)sw.innerHTML=buildSkillSugs();i.value="";}};
window.addSkillN=function(s){if(!S.skills.includes(s)){S.skills.push(s);document.getElementById("skillTags").innerHTML=buildSkillTags();var sw=document.querySelector(".skill-sugs");if(sw)sw.innerHTML=buildSkillSugs();}};
window.setVerify=function(m){S.verifyM=m;document.getElementById("stepContent").innerHTML=buildForm("verify");if(m==="otp")setTimeout(function(){var p=document.getElementById("otpPhone");if(p){p.focus();}},50);};
window.onDLUpload=function(){S.dlOk=true;document.getElementById("stepContent").innerHTML=buildForm("verify");};
window.onResumeUpload=function(){S.resumeOk=true;document.getElementById("stepContent").innerHTML=buildForm("basic");};
window.onPhotoUpload=function(el){if(el.files&&el.files[0]){S.photo=URL.createObjectURL(el.files[0]);document.getElementById("photoBox").innerHTML='<img src="'+S.photo+'" style="width:100%;height:100%;object-fit:cover"/>';}};
var _resendTimer=null;
window.updateSendBtn=function(){var btn=document.getElementById("btnSendOtp");if(btn)btn.disabled=S.otpPhone.replace(/\D/g,"").length<10;};
window.sendOTP=function(){if(S.otpPhone.replace(/\D/g,"").length<10)return;S.otpSent=true;S.otpCode=["","","","","",""];S.otpError="";S.otpResendIn=30;document.getElementById("stepContent").innerHTML=buildForm("verify");setTimeout(function(){var b=document.getElementById("otp0");if(b)b.focus();},50);startResendTimer();};
function startResendTimer(){clearInterval(_resendTimer);_resendTimer=setInterval(function(){S.otpResendIn=Math.max(0,S.otpResendIn-1);var el=document.getElementById("resendTimer");if(el)el.textContent=S.otpResendIn+"s";if(S.otpResendIn<=0){clearInterval(_resendTimer);var row=document.querySelector(".resend-row");if(row)row.innerHTML='Didn\'t receive it? <button class="resend-link" onclick="resendOTP()">Resend code</button>';}},1000);}
window.resendOTP=function(){S.otpCode=["","","","","",""];S.otpError="";S.otpResendIn=30;document.getElementById("stepContent").innerHTML=buildForm("verify");setTimeout(function(){var b=document.getElementById("otp0");if(b)b.focus();},50);startResendTimer();};
window.resetOTP=function(){S.otpSent=false;S.otpVerified=false;S.otpCode=["","","","","",""];S.otpError="";S.otpResendIn=0;clearInterval(_resendTimer);document.getElementById("stepContent").innerHTML=buildForm("verify");setTimeout(function(){var p=document.getElementById("otpPhone");if(p){p.focus();p.select();}},50);};
window.otpInput=function(evt,idx){var val=evt.target.value.replace(/\D/g,"").slice(-1);evt.target.value=val;S.otpCode[idx]=val;evt.target.classList.toggle("filled",!!val);var btn=document.querySelector(".btn-verify-otp");if(btn)btn.disabled=S.otpCode.join("").length<6;if(val&&idx<5){var next=document.getElementById("otp"+(idx+1));if(next)next.focus();}if(S.otpCode.join("").length===6)setTimeout(verifyOTP,120);};
window.otpKeydown=function(evt,idx){if(evt.key==="Backspace"&&!S.otpCode[idx]&&idx>0){S.otpCode[idx-1]="";var prev=document.getElementById("otp"+(idx-1));if(prev){prev.value="";prev.classList.remove("filled");prev.focus();}}if(evt.key==="ArrowLeft"&&idx>0){document.getElementById("otp"+(idx-1))&&document.getElementById("otp"+(idx-1)).focus();}if(evt.key==="ArrowRight"&&idx<5){document.getElementById("otp"+(idx+1))&&document.getElementById("otp"+(idx+1)).focus();}};
window.otpPaste=function(evt){evt.preventDefault();var text=(evt.clipboardData||window.clipboardData).getData("text").replace(/\D/g,"").slice(0,6);text.split("").forEach(function(ch,i){S.otpCode[i]=ch;var box=document.getElementById("otp"+i);if(box){box.value=ch;box.classList.toggle("filled",!!ch);}});var btn=document.querySelector(".btn-verify-otp");if(btn)btn.disabled=S.otpCode.join("").length<6;var last=Math.min(text.length,5);var el=document.getElementById("otp"+last);if(el)el.focus();if(text.length===6)setTimeout(verifyOTP,120);};
window.verifyOTP=function(){var code=S.otpCode.join("");if(code.length<6)return;if(code==="000000"){S.otpError="Invalid code. Please try again.";document.getElementById("stepContent").innerHTML=buildForm("verify");setTimeout(function(){document.getElementById("otp0")&&document.getElementById("otp0").focus();},30);return;}S.otpVerified=true;S.otpError="";clearInterval(_resendTimer);document.getElementById("stepContent").innerHTML=buildForm("verify");};
window.fakeLI=function(){S.fn="Sarah";S.ln="Chen";S.headline="Fractional CFO · ex-Goldman Sachs · 3 IPOs";S.bio="Seasoned finance executive with 18 years building high-growth companies from Series A to public markets. Formerly CFO at two unicorns, advisor to 14+ portfolio companies.";render();setTimeout(function(){var fn=document.getElementById("fFn");if(fn)fn.value=S.fn;var ln=document.getElementById("fLn");if(ln)ln.value=S.ln;var hl=document.querySelector('input[placeholder*="Fractional"]');if(hl)hl.value=S.headline;var bio=document.querySelector("textarea");if(bio){bio.value=S.bio;var bc=document.getElementById("bc");if(bc)bc.textContent=S.bio.length+"/500";}},30);};

// Start on the auth screen
render();
})();

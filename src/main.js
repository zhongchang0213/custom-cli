import pic from "./assets/images/users.png"
import './assets/css/app.css';
import './assets/css/index.less';
import './assets/css/test.scss';

var img = new Image();
img.src = pic;
img.classList.add("logo");
var app = document.getElementById("app");
app.appendChild(img);
 
 
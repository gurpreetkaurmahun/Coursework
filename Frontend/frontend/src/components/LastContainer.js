import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function LastContainer(){
    return<div><hr class="featurette-divider"/>

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading fw-normal lh-1">Clothing <span class="text-body-secondary">It’ll blow your mind.</span></h2>
        <p class="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
      </div>
      <div class="col-md-5">
        <img src="https://www.gauriandnainika.com/cdn/shop/files/2.jpg?v=1694506904&width=900" style={{height:500,width:500}}></img>
      </div>
    </div>

    <hr class="featurette-divider"/>

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading fw-normal lh-1">Accessories<span class="text-body-secondary">See for yourself.</span></h2>
        <p class="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
      </div>
      <div class="col-md-5 order-md-1">
      <img src="https://www.telegraph.co.uk/content/dam/luxury/2021/06/09/25062020-SM-Goossens-LOOK-003-095_trans_NvBQzQNjv4BqoE_CgXfRUK08ca8mnkkJH-gtdWNmx8g9NFAAAF9gsxk.jpg?imwidth=680" style={{heihgt:800,width:600}}></img>
      </div>
    </div>

    <hr class="featurette-divider"/>

    <div class="row featurette">
      <div class="col-md-7">
        
        <h2 class="featurette-heading fw-normal lh-1">Home and Living <span class="text-body-secondary">Checkmate.</span></h2>
        <p class="lead">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
      </div>
      <div class="col-md-5">
       <img  height="500px" width="500px"src=""/>
      </div>
    </div>

    <hr class="featurette-divider"/>

 

  </div>
}

export default LastContainer;
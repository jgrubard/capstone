import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = () => {

    return (
        <div id="page-top">

            {/* <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">Pair Up!</a>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
          <i class="fa fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <Link to={`/login`} class="nav-link js-scroll-trigger" href="#download">Log In</Link>
                            </li>
                            <li class="nav-item">
                            <Link to={`/signup`} class="nav-link js-scroll-trigger" href="#features">Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}

            <header class="masthead">
                <div class="container h-100">
                    <div class="row h-100">
                        <div class="col-lg-7 my-auto">
                            <div class="header-content mx-auto">
                                <h1 class="mb-5">Pair Up! is an app that will help you create strong community inside your organization!</h1>
                                <a href="#download" class="btn btn-outline btn-xl js-scroll-trigger">Start Now for Free!</a>
                            </div>
                        </div>
                        <div class="col-lg-5 my-auto">
                            <div class="device-container">
                                <div class="device-mockup iphone6_plus portrait white">
                                    <div class="device">
                                        <div class="screen">
                                            <img src="img/demo-screen-1.jpg" class="img-fluid" alt=""></img>
                                        </div>
                                        <div class="button">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section class="download bg-primary text-center" id="download">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 mx-auto">
                            <h2 class="section-heading">Discover what all the buzz is about!</h2>
                            <p>Our app is available on any mobile device! Download now to get started!</p>
                            <div class="badges">
                                <a class="badge-link" href="#"><img src="img/google-play-badge.svg" alt=""></img></a>
                                <a class="badge-link" href="#"><img src="img/app-store-badge.svg" alt=""></img></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features" id="features">
                <div class="container">
                    <div class="section-heading text-center">
                        <h2>Unlimited Features, Unlimited Fun</h2>
                        <p class="text-muted">Check out what you can do with this app!</p>
                        <hr></hr>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 my-auto">
                            <div class="device-container">
                                <div class="device-mockup iphone6_plus portrait white">
                                    <div class="device">
                                        <div class="screen">
                                            <img src="img/demo-screen-1.jpg" class="img-fluid" alt=""></img>
                                        </div>
                                        <div class="button">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8 my-auto">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="feature-item">
                                            <i class="icon-screen-smartphone text-primary"></i>
                                            <h3>User Check-In</h3>
                                            <p class="text-muted">Ready to use HTML/CSS device mockups, no Photoshop required!</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="feature-item">
                                            <i class="icon-camera text-primary"></i>
                                            <h3>Request Partner</h3>
                                            <p class="text-muted">Put an image, video, animation, or anything else in the screen!</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="feature-item">
                                            <i class="icon-present text-primary"></i>
                                            <h3>Chat Functionality</h3>
                                            <p class="text-muted">As always, this theme is free to download and use for any purpose!</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="feature-item">
                                            <i class="icon-lock-open text-primary"></i>
                                            <h3>Search Nearby Organization</h3>
                                            <p class="text-muted">Since this theme is MIT licensed, you can use it commercially!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="cta">
                <div class="cta-content">
                    <div class="container">
                        <h2>Stop waiting.<br></br>Start building.</h2>
                        <a href="#contact" class="btn btn-outline btn-xl js-scroll-trigger">Let's Get Started!</a>
                    </div>
                </div>
                <div class="overlay"></div>
            </section>

            <footer>
                <div class="container">
                    <p>&copy; Your Website 2018. All Rights Reserved.</p>
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <a href="#">Privacy</a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#">Terms</a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#">FAQ</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}


export default connect(null, null)(Home)

$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Vazha Mikadze";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item ${project.category}">
        <div class="box " style="width: 380px; margin: 1rem">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>
    </div>`
    });
    projectsContainer.innerHTML = projectsHTML;

    // vanilla tilt.js
    // VanillaTilt.init(document.querySelectorAll(".tilt"), {
    //     max: 20,
    // });
    // // vanilla tilt.js  

    // /* ===== SCROLL REVEAL ANIMATION ===== */
    // const srtop = ScrollReveal({
    //     origin: 'bottom',
    //     distance: '80px',
    //     duration: 1000,
    //     reset: true
    // });

    // /* SCROLL PROJECTS */
    // srtop.reveal('.work .box', { interval: 200 });

    // isotope filter products
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

getProjects().then(data => {
    showProjects(data);
})
// fetch projects end


// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// send information in firebase



// const db = firebase.firestore();

// const registrationsCollection = db.collection('registrations');

// function handleRegistrationSubmit(event){
//     event.preventDefault();


//     const formData = new FormData(event.target);
//     const name = formData.get('name');
//     const email = formData.get('email');
//     const number = formData.get('number');
//     const message = formData.get('message');


// registrationsCollection.add({
//     name,
//     email,
//     number,
//     message
// }).then(()=>{
//     console.log('registration information added to firestore!');

// }).catch(error =>{
//     console.log('error adding registration information to firestore:', error)
// }) ;
// }

// const registrationForm = document.getElementById('contact-form');
// registrationForm.addEventListener('submit', handleRegistrationSubmit);

// Replace these with your actual email service, user, and template IDs
 
const EMAIL_SERVICE_ID = 'service_lxjztok';
const EMAIL_USER_ID = 'R4TmGdpVjH2TFV1cK';
const EMAIL_TEMPLATE_ID = 'template_3bcdteo';

emailjs.init(EMAIL_SERVICE_ID, EMAIL_USER_ID);




function sendEmail(data) {
    // Replace these with your actual email service, user, and template IDs
    const EMAIL_SERVICE_ID = 'service_lxjztok';
    const EMAIL_USER_ID = 'R4TmGdpVjH2TFV1cK';
    const EMAIL_TEMPLATE_ID = 'template_3bcdteo';

    // Prepare the email parameters
    const emailParams = {
        to_name: data.name,
        to_email: data.email,
        message: data.message
    };

    // Send the email using EmailJS
    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, emailParams, EMAIL_USER_ID)
        .then(function (response) {
            console.log('Email sent successfully', response);
        }, function (error) {
            console.error('Failed to send email', error);
        });
}
const data = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    message: 'Hello, this is a test email sent using EmailJS!'
};

sendEmail(data);



const btn = document.getElementById("btn")

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Sending...";

    const serviceID = "service_lxjztok";
    const templateID = "template_3bcdteo";

    emailjs.sendForm(serviceID, templateID, this).then(
        () => {
            btn.value = "Send Email";
            alert("Sent!");
            document.querySelector("#to_name").value = "";
            document.querySelector("#from_email").value = "";
            document.querySelector("#phone").value = "";
            document.querySelector("#message").value = "";
        },
        (err) => {
            btn.value = "Send Email";
            console.log(JSON.stringify(err));
        }
    );
});
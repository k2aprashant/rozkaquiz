/*=========================DYNAMIC DOMAIN=========================*/
const currentDomain = window.location.origin;
const setting = "assets/json";

document.getElementById("canonicalUrl").setAttribute("href", currentDomain);
document.getElementById("ogUrl").setAttribute("content", currentDomain);

fetch('assets/json/govt-strip.json')
    .then(response => response.json())
    .then(data => {

        const examStripContainer = document.getElementById("examStripContainer");
        examStripContainer.innerHTML = "";
        const govtStripData = data.govt_strip;

        govtStripData.forEach(exam => {

            // Empty data check
            if (
                !exam.name ||
                !exam.image
            ) {
                return;
            }

            examStripContainer.innerHTML += `
                <div class="flex-shrink-0 w-36 md:w-auto snap-center group cursor-pointer">

                    <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

                        <div class="aspect-[4/3] overflow-hidden">

                            <img 
                                src="${exam.image}"
                                alt="${exam.alt || exam.name}"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            >

                        </div>

                        <div class="p-2.5 text-center">

                            <p class="text-brandBlue font-semibold text-sm">
                                ${exam.name}
                            </p>

                        </div>

                    </div>

                </div>
            `;
        });

    })
    .catch(error => {
        console.error("Govt Strip Error:", error);
    });

fetch(`${setting}/site-setting.json`)
    .then(response => response.json())
    .then(data => {
        const siteData = data.site;
        const socialData = data.social;

        /*========================= TODAY QUIZ LINK =========================*/
        document.getElementById("startQuizBtn").href = siteData.link;
        document.getElementById("mobileStartQuizBtn").href = siteData.link;

        /* ========================= SITE LOGO ========================= */
        document.getElementById("siteLogo").innerHTML = `
            <a href="#" class="flex items-center gap-2">
                <img 
                    src="${siteData.logo}" 
                    class="w-40 h-40 object-contain" 
                    alt="${siteData.name}"
                >
            </a>
        `;

        /* ========================= FAVICON ========================= */
        document.getElementById("favicon").href = siteData.favicon;

        /* ========================= OG IMAGE ========================= */
        document.getElementById("ogImage").setAttribute(
            "content",
            `${currentDomain}/${siteData.preview_image}`
        );

        /* ========================= TWITTER IMAGE ========================= */
        document.getElementById("twitterImage").setAttribute(
            "content",
            `${currentDomain}/${siteData.preview_image}`
        );

        /* ========================= SOCIAL ICONS ========================= */
        const socialContainer = document.getElementById("socialIcons");

        socialContainer.innerHTML = "";

        socialData.forEach(social => {

            socialContainer.innerHTML += `
                <a href="${social.link}" target="_blank" class="group">
                    <div class="w-12 h-12 bg-brandBlue rounded-full flex items-center justify-center hover:bg-brandYellow hover:scale-110 transition-all duration-300 shadow-md">
                        <i class="${social.icon} text-white group-hover:text-brandBlue transition-colors"></i>
                    </div>
                </a>
            `;
        });

        /* ========================= SCHEMA JSON ========================= */
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": siteData.name,
            "url": currentDomain,
            "logo": `${currentDomain}/${siteData.logo}`,
            "sameAs": socialData.map(social => social.link)
        };

        document.getElementById("schemaJson").textContent =
            JSON.stringify(schemaData);

    })
    .catch(error => {
        console.error("Error loading settings:", error);
    });

fetch('assets/json/quiz-cards.json')
    .then(response => response.json())
    .then(data => {

        const quizContainer = document.getElementById("quizCards");
        quizContainer.innerHTML = "";
        const quizData = data.quiz_cards;

        quizData.forEach(quiz => {

            // Empty data check
            if (
                !quiz.title ||
                !quiz.link ||
                !quiz.category ||
                !quiz.description
            ) {
                return;
            }

            quizContainer.innerHTML += `
                <a href="${quiz.link}" target="_blank" class="group block">
                    <div class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">

                        <div class="p-6 flex-1 flex flex-col">

                            <div class="flex items-start justify-between mb-3">

                                ${quiz.category ? `
                                <span class="bg-brandBlue/10 text-brandBlue text-xs font-semibold px-3 py-1 rounded-full">
                                    ${quiz.category}
                                </span>` : ''}

                                ${quiz.difficulty ? `
                                <span class="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">
                                    ${quiz.difficulty}
                                </span>` : ''}

                            </div>

                            ${quiz.title ? `
                            <h3 class="text-lg font-bold text-gray-900 mb-2">
                                ${quiz.title}
                            </h3>` : ''}

                            ${quiz.description ? `
                            <p class="text-gray-500 text-sm mb-4 flex-1">
                                ${quiz.description}
                            </p>` : ''}

                            <div class="flex items-center gap-4 text-xs text-gray-400 mb-4">

                                ${quiz.questions ? `
                                <span>
                                    ${quiz.questions} Questions
                                </span>` : ''}

                                ${quiz.time ? `
                                <span>
                                    ${quiz.time}
                                </span>` : ''}

                            </div>

                            <button class="w-full bg-brandBlue text-white font-semibold text-sm py-2.5 rounded-lg">
                                Start Quiz
                            </button>

                        </div>
                    </div>
                </a>
            `;
        });

    })
    .catch(error => {
        console.error("Quiz Data Error:", error);
    });
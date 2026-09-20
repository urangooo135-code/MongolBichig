/* =====================================================
   MONGOL BICHIG — APP.JS
   22 ДАСГАЛ
===================================================== */

const canvas = document.getElementById("canvas");
const writingArea = document.getElementById("writingArea");

const lessonCard = document.querySelector(".lesson-card");

const guideCharacter = document.getElementById("guideCharacter");
const guide = document.getElementById("guide");

const progress = document.getElementById("progress");
const lessonTitle = document.getElementById("lessonTitle");
const position = document.getElementById("position");
const message = document.getElementById("message");

const backButton = document.getElementById("backButton");
const clearButton = document.getElementById("clearButton");
const nextButton = document.getElementById("nextButton");

const ctx = canvas.getContext("2d");


/* =====================================================
   STATE
===================================================== */

let currentLesson = 0;
let drawing = false;
let points = [];


/* =====================================================
   MONGOLIAN UNICODE
===================================================== */

const A  = "\u1820";
const E  = "\u1821";
const I  = "\u1822";
const O  = "\u1823";
const U  = "\u1824";
const UE = "\u1826";

const NIRUGU = "\u180A";
const ZWJ = "\u200D";
const FVS1 = "\u180B";


/* =====================================================
   BASIC FORMS
===================================================== */

function beginning(letter) {
    return letter + ZWJ;
}

function middle(letter) {
    return NIRUGU + letter + NIRUGU;
}

function ending(letter) {
    return NIRUGU + letter;
}


/* =====================================================
   19–22 SPECIAL FORMS
===================================================== */

function lesson19Glyph() {
    return (
        A +
        NIRUGU +
        NIRUGU +
        A +
        NIRUGU +
        NIRUGU +
        A +
        A +
        FVS1
    );
}

function lesson20Glyph() {
    return (
        E +
        NIRUGU +
        NIRUGU +
        E +
        NIRUGU +
        NIRUGU +
        E +
        E +
        FVS1
    );
}

function lesson21Glyph() {
    return (
        U +
        NIRUGU +
        NIRUGU +
        A +
        NIRUGU +
        NIRUGU +
        U +
        A +
        FVS1
    );
}

function lesson22Glyph() {
    return (
        UE +
        NIRUGU +
        NIRUGU +
        E +
        NIRUGU +
        NIRUGU +
        UE +
        E +
        FVS1
    );
}


/* =====================================================
   REMOVE VISUAL FVS / ! / SQUARE
===================================================== */

function cleanDisplayGlyph(text) {

    return String(text || "")
        .replace(/\u180B/g, "")
        .replace(/!/g, "")
        .replace(/□/g, "")
        .trim();
}


/* =====================================================
   LESSONS
===================================================== */

const lessons = [

    /* 1 */
    {
        glyph: beginning(A),
        title: "Үгийн эхэнд ордог а-г бичээрэй",
        position: "Үгийн эхэнд",
        keyboard: "a + Shift + 2"
    },

    /* 2 */
    {
        glyph: middle(A),
        title: "Үгийн дунд ордог а-г бичээрэй",
        position: "Үгийн дунд",
        keyboard: "/ + a + /"
    },

    /* 3 */
    {
        glyph: ending(A),
        title: "Үгийн адагт ордог а-г бичээрэй",
        position: "Үгийн адагт",
        keyboard: "/ + a"
    },

    /* 4 */
    {
        glyph: beginning(E),
        title: "Үгийн эхэнд ордог э-г бичээрэй",
        position: "Үгийн эхэнд",
        keyboard: "e + Shift + 2"
    },

    /* 5 */
    {
        glyph: middle(E),
        title: "Үгийн дунд ордог э-г бичээрэй",
        position: "Үгийн дунд",
        keyboard: "/ + e + /"
    },

    /* 6 */
    {
        glyph: ending(E),
        title: "Үгийн адагт ордог э-г бичээрэй",
        position: "Үгийн адагт",
        keyboard: "/ + e"
    },

    /* 7 */
    {
        glyph: beginning(O),
        title: "Үгийн эхэнд ордог о-г бичээрэй",
        position: "Үгийн эхэнд",
        keyboard: "u + Shift + 2"
    },

    /* 8 */
    {
        glyph: middle(O),
        title: "Үгийн дунд ордог о-г бичээрэй",
        position: "Үгийн дунд",
        keyboard: "/ + u + /"
    },

    /* 9 */
    {
        glyph: ending(O),
        title: "Үгийн адагт ордог о-г бичээрэй",
        position: "Үгийн адагт",
        keyboard: "/ + u"
    },

    /* 10 */
    {
        glyph: beginning(U),
        title: "Үгийн эхэнд ордог у-г бичээрэй",
        position: "Үгийн эхэнд",
        keyboard: "u + Shift + 2"
    },

    /* 11 */
    {
        glyph: middle(U),
        title: "Үгийн дунд ордог у-г бичээрэй",
        position: "Үгийн дунд",
        keyboard: "/ + u + /"
    },

    /* 12 */
    {
        glyph: ending(U),
        title: "Үгийн адагт ордог у-г бичээрэй",
        position: "Үгийн адагт",
        keyboard: "/ + u"
    },

    /* 13 */
    {
        glyph: beginning(UE),
        title: "Үгийн эхэнд ордог ү-г бичээрэй",
        position: "Үгийн эхэнд",
        keyboard: "v + Shift + 2"
    },

    /* 14 */
    {
        glyph: middle(UE),
        title: "Үгийн дунд ордог ү-г бичээрэй",
        position: "Үгийн дунд",
        keyboard: "/ + v + /"
    },

    /* 15 */
    {
        glyph: ending(UE),
        title: "Үгийн адагт ордог ү-г бичээрэй",
        position: "Үгийн адагт",
        keyboard: "/ + v"
    },

    /* 16 */
    {
        glyph: beginning(I),
        title: "Үгийн эхэнд ордог и-г бичээрэй",
        position: "Үгийн эхэнд",
        keyboard: "i + Shift + 2"
    },

    /* 17 */
    {
        glyph: middle(I),
        title: "Үгийн дунд ордог и-г бичээрэй",
        position: "Үгийн дунд",
        keyboard: "/ + i + /"
    },

    /* 18 */
    {
        glyph: ending(I),
        title: "Үгийн адагт ордог и-г бичээрэй",
        position: "Үгийн адагт",
        keyboard: "/ + i"
    },

    /* 19 */
    {
        glyph: lesson19Glyph(),
        title: "Энэ а-г зөв дарааллаар бичээрэй",
        position: "Холбоо үсэг",
        keyboard: "a + / + / + a + / + / + a + a + Shift 1"
    },

    /* 20 */
    {
        glyph: lesson20Glyph(),
        title: "Энэ э-г зөв дарааллаар бичээрэй",
        position: "Холбоо үсэг",
        keyboard: "e + / + / + e + / + / + e + e + Shift 1"
    },

    /* 21 */
    {
        glyph: lesson21Glyph(),
        title: "Энэ у-г зөв дарааллаар бичээрэй",
        position: "Холбоо үсэг",
        keyboard: "u + / + / + a + / + / + u + a + Shift 1"
    },

    /* 22 */
    {
        glyph: lesson22Glyph(),
        title: "Энэ ү-г зөв дарааллаар бичээрэй",
        position: "Холбоо үсэг",
        keyboard: "v + / + / + e + / + / + v + e + Shift 1"
    }

];


/* =====================================================
   CANVAS
===================================================== */

function resizeCanvas() {

    const rect = writingArea.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#58cc02";
}


/* =====================================================
   SHOW LESSON
===================================================== */

function showLesson() {

    const lesson = lessons[currentLesson];

    progress.textContent =
        `${currentLesson + 1} / ${lessons.length}`;

    const visibleGlyph =
        cleanDisplayGlyph(lesson.glyph);

    guideCharacter.textContent =
        visibleGlyph;

    guide.textContent =
        visibleGlyph;

    lessonTitle.textContent =
        lesson.title;

    position.textContent =
        lesson.position;

    message.className = "";

    message.innerHTML =
        `↘ Эндээс эхлээд доош чиглэлээр бичнэ
        · үзэг салгахгүй
        · 45° налуу`;

    if (currentLesson === 0) {

        backButton.disabled = true;
        backButton.style.opacity = "0.45";

    } else {

        backButton.disabled = false;
        backButton.style.opacity = "1";
    }

    if (
        currentLesson ===
        lessons.length - 1
    ) {

        nextButton.textContent = "✓";

    } else {

        nextButton.textContent = "→";
    }

    if (currentLesson >= 18) {

        lessonCard.classList.add("long-lesson");

    } else {

        lessonCard.classList.remove("long-lesson");
    }

    clearCanvas();

    requestAnimationFrame(() => {
        resizeCanvas();
    });
}


/* =====================================================
   CLEAR
===================================================== */

function clearCanvas() {

    const rect =
        writingArea.getBoundingClientRect();

    ctx.clearRect(
        0,
        0,
        rect.width,
        rect.height
    );

    points = [];
    drawing = false;

    const lesson =
        lessons[currentLesson];

    message.className = "";

    message.innerHTML =
        `↘ Эндээс эхлээд доош чиглэлээр бичнэ
        · үзэг салгахгүй
        · 45° налуу`;
}


/* =====================================================
   POINTER POSITION
===================================================== */

function getPoint(event) {

    const rect =
        canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


/* =====================================================
   DRAW START
===================================================== */

canvas.addEventListener(
    "pointerdown",
    function (event) {

        event.preventDefault();

        drawing = true;

        canvas.setPointerCapture(
            event.pointerId
        );

        const point =
            getPoint(event);

        points = [point];

        ctx.beginPath();

        ctx.moveTo(
            point.x,
            point.y
        );
    }
);


/* =====================================================
   DRAW
===================================================== */

canvas.addEventListener(
    "pointermove",
    function (event) {

        if (!drawing) return;

        event.preventDefault();

        const point =
            getPoint(event);

        points.push(point);

        ctx.lineTo(
            point.x,
            point.y
        );

        ctx.stroke();
    }
);


/* =====================================================
   DRAW END
===================================================== */

function stopDrawing(event) {

    if (!drawing) return;

    drawing = false;

    try {

        canvas.releasePointerCapture(
            event.pointerId
        );

    } catch (error) {}

    checkWriting();
}


canvas.addEventListener(
    "pointerup",
    stopDrawing
);

canvas.addEventListener(
    "pointercancel",
    stopDrawing
);


/* =====================================================
   CHECK WRITING
===================================================== */

function checkWriting() {

    if (points.length < 8) {

        showWrong();

        return;
    }


    let totalLength = 0;

    for (
        let i = 1;
        i < points.length;
        i++
    ) {

        const dx =
            points[i].x -
            points[i - 1].x;

        const dy =
            points[i].y -
            points[i - 1].y;

        totalLength +=
            Math.sqrt(
                dx * dx +
                dy * dy
            );
    }


    if (totalLength < 45) {

        showWrong();

        return;
    }


    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;


    for (const p of points) {

        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);

        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    }


    const width =
        maxX - minX;

    const height =
        maxY - minY;


    if (
        width < 20 &&
        height < 20
    ) {

        showWrong();

        return;
    }


    /*
       Маш их хэвтээ зурсан
    */

    if (
        width > height * 5 &&
        width > 150
    ) {

        showWrong();

        return;
    }


    /*
       Хэт тас далий
    */

    const first =
        points[0];

    const last =
        points[
            points.length - 1
        ];


    const dx =
        Math.abs(
            last.x -
            first.x
        );

    const dy =
        Math.abs(
            last.y -
            first.y
        );


    if (
        dx > dy * 6 &&
        dx > 180
    ) {

        showWrong();

        return;
    }


    showCorrect();
}


/* =====================================================
   CORRECT / WRONG
===================================================== */

function showCorrect() {

    message.className =
        "correct";

    message.textContent =
        "Сайн байна! ✓";
}


function showWrong() {

    message.className =
        "wrong";

    message.textContent =
        "Дахин оролдоорой";
}


/* =====================================================
   NEXT
===================================================== */

nextButton.addEventListener(
    "click",
    function () {

        if (
            currentLesson <
            lessons.length - 1
        ) {

            currentLesson++;

            showLesson();

        } else {

            message.className =
                "correct";

            message.textContent =
                "🎉 Бүх дасгалыг дуусгалаа!";
        }
    }
);


/* =====================================================
   BACK
===================================================== */

backButton.addEventListener(
    "click",
    function () {

        if (currentLesson > 0) {

            currentLesson--;

            showLesson();
        }
    }
);


/* =====================================================
   CLEAR BUTTON
===================================================== */

clearButton.addEventListener(
    "click",
    function () {

        clearCanvas();
    }
);


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    function () {

        resizeCanvas();
    }
);


window.addEventListener(
    "orientationchange",
    function () {

        setTimeout(
            resizeCanvas,
            150
        );
    }
);


/* =====================================================
   START
===================================================== */

requestAnimationFrame(
    function () {

        resizeCanvas();

        showLesson();
    }
);

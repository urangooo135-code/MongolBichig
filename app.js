/* =====================================================
   MONGOL BICHIG — APP.JS
   22 ДАСГАЛ
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const canvas =
    document.getElementById("canvas");

const writingArea =
    document.getElementById("writingArea");

const lessonCard =
    document.querySelector(".lesson-card");

const guideCharacter =
    document.getElementById("guideCharacter");

const guide =
    document.getElementById("guide");

const progress =
    document.getElementById("progress");

const lessonTitle =
    document.getElementById("lessonTitle");

const position =
    document.getElementById("position");

const message =
    document.getElementById("message");

const backButton =
    document.getElementById("backButton");

const clearButton =
    document.getElementById("clearButton");

const nextButton =
    document.getElementById("nextButton");

const ctx =
    canvas.getContext("2d");


/* =====================================================
   STATE
===================================================== */

let points = [];

let drawing = false;

let currentLesson = 0;


/* =====================================================
   MONGOLIAN UNICODE
===================================================== */

/*
   ᠊  = NIRUGU
   ZWJ = холболт
   FVS1 = Shift + 1
*/

const NIRUGU = "\u180A";

const ZWJ = "\u200D";

const FVS1 = "\u180B";


const LETTERS = {

    A: "\u1820",

    E: "\u1821",

    I: "\u1822",

    O: "\u1823",

    U: "\u1824",

    UE: "\u1826"

};


/* =====================================================
   BASIC LETTER FORMS
===================================================== */

function beginning(letter) {

    return (
        letter +
        ZWJ
    );
}


function middle(letter) {

    return (
        NIRUGU +
        letter +
        NIRUGU
    );
}


function ending(letter) {

    return (
        NIRUGU +
        letter
    );
}


/* =====================================================
   19–22 COMBINATIONS
===================================================== */

/*
   19:
   A + / + / + A + / + / + A + AShift1

   20:
   E + / + / + E + / + / + E + E + Shift1

   21:
   U + / + / + A + / + / + U + A + Shift1

   22:
   V + / + / + E + / + / + V + E + Shift1
*/


function newLesson1() {

    return (
        LETTERS.A +
        NIRUGU +
        NIRUGU +
        LETTERS.A +
        NIRUGU +
        NIRUGU +
        LETTERS.A +
        LETTERS.A +
        FVS1
    );
}


function newLesson2() {

    return (
        LETTERS.E +
        NIRUGU +
        NIRUGU +
        LETTERS.E +
        NIRUGU +
        NIRUGU +
        LETTERS.E +
        LETTERS.E +
        FVS1
    );
}


function newLesson3() {

    return (
        LETTERS.U +
        NIRUGU +
        NIRUGU +
        LETTERS.A +
        NIRUGU +
        NIRUGU +
        LETTERS.U +
        LETTERS.A +
        FVS1
    );
}


function newLesson4() {

    return (
        LETTERS.UE +
        NIRUGU +
        NIRUGU +
        LETTERS.E +
        NIRUGU +
        NIRUGU +
        LETTERS.UE +
        LETTERS.E +
        FVS1
    );
}


/* =====================================================
   DISPLAY GLYPH
===================================================== */

/*
   Зарим Dashitseden/font дээр
   U+180B (FVS1) нь ! эсвэл дөрвөлжин
   шиг харагддаг.

   Тиймээс FVS1-ийг shaping-д ашиглана,
   гэхдээ дэлгэцийн guide дээр тусдаа
   тэмдэг болж харагдуулахгүй.
*/

function displayGlyph(glyph) {

    return glyph.replace(
        new RegExp(FVS1, "g"),
        ""
    );
}


/* =====================================================
   LESSONS
===================================================== */

const lessons = [

    /* =================================================
       1
    ================================================= */

    {
        glyph: beginning(LETTERS.A),

        vowel: "а",

        position: "Үгийн эхэнд",

        title:
            "Үгийн эхэнд ордог а-г бичээрэй",

        keyboard:
            "A + Shift + 2",

        direction:
            "↘ Эндээс эхлээд доош чиглэлээр бичнэ"
    },


    /* =================================================
       2
    ================================================= */

    {
        glyph: middle(LETTERS.A),

        vowel: "а",

        position: "Үгийн дунд",

        title:
            "Үгийн дунд ордог а-г бичээрэй",

        keyboard:
            "/ + A + /",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       3
    ================================================= */

    {
        glyph: ending(LETTERS.A),

        vowel: "а",

        position: "Үгийн адагт",

        title:
            "Үгийн адагт ордог а-г бичээрэй",

        keyboard:
            "/ + A",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       4
    ================================================= */

    {
        glyph: beginning(LETTERS.E),

        vowel: "э",

        position: "Үгийн эхэнд",

        title:
            "Үгийн эхэнд ордог э-г бичээрэй",

        keyboard:
            "E + Shift + 2",

        direction:
            "↘ Эндээс эхлээд доош чиглэлээр бичнэ"
    },


    /* =================================================
       5
    ================================================= */

    {
        glyph: middle(LETTERS.E),

        vowel: "э",

        position: "Үгийн дунд",

        title:
            "Үгийн дунд ордог э-г бичээрэй",

        keyboard:
            "/ + E + /",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       6
    ================================================= */

    {
        glyph: ending(LETTERS.E),

        vowel: "э",

        position: "Үгийн адагт",

        title:
            "Үгийн адагт ордог э-г бичээрэй",

        keyboard:
            "/ + E",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       7
    ================================================= */

    {
        glyph: beginning(LETTERS.O),

        vowel: "о",

        position: "Үгийн эхэнд",

        title:
            "Үгийн эхэнд ордог о-г бичээрэй",

        keyboard:
            "U + Shift + 2",

        direction:
            "↘ Эндээс эхлээд доош чиглэлээр бичнэ"
    },


    /* =================================================
       8
    ================================================= */

    {
        glyph: middle(LETTERS.O),

        vowel: "о",

        position: "Үгийн дунд",

        title:
            "Үгийн дунд ордог о-г бичээрэй",

        keyboard:
            "/ + U + /",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       9
    ================================================= */

    {
        glyph: ending(LETTERS.O),

        vowel: "о",

        position: "Үгийн адагт",

        title:
            "Үгийн адагт ордог о-г бичээрэй",

        keyboard:
            "/ + U",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       10
    ================================================= */

    {
        glyph: beginning(LETTERS.U),

        vowel: "у",

        position: "Үгийн эхэнд",

        title:
            "Үгийн эхэнд ордог у-г бичээрэй",

        keyboard:
            "U + Shift + 2",

        direction:
            "↘ Эндээс эхлээд доош чиглэлээр бичнэ"
    },


    /* =================================================
       11
    ================================================= */

    {
        glyph: middle(LETTERS.U),

        vowel: "у",

        position: "Үгийн дунд",

        title:
            "Үгийн дунд ордог у-г бичээрэй",

        keyboard:
            "/ + U + /",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       12
    ================================================= */

    {
        glyph: ending(LETTERS.U),

        vowel: "у",

        position: "Үгийн адагт",

        title:
            "Үгийн адагт ордог у-г бичээрэй",

        keyboard:
            "/ + U",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       13
    ================================================= */

    {
        glyph: beginning(LETTERS.UE),

        vowel: "ү",

        position: "Үгийн эхэнд",

        title:
            "Үгийн эхэнд ордог ү-г бичээрэй",

        keyboard:
            "V + Shift + 2",

        direction:
            "↘ Эндээс эхлээд доош чиглэлээр бичнэ"
    },


    /* =================================================
       14
    ================================================= */

    {
        glyph: middle(LETTERS.UE),

        vowel: "ү",

        position: "Үгийн дунд",

        title:
            "Үгийн дунд ордог ү-г бичээрэй",

        keyboard:
            "/ + V + /",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       15
    ================================================= */

    {
        glyph: ending(LETTERS.UE),

        vowel: "ү",

        position: "Үгийн адагт",

        title:
            "Үгийн адагт ордог ү-г бичээрэй",

        keyboard:
            "/ + V",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       16
    ================================================= */

    {
        glyph: beginning(LETTERS.I),

        vowel: "и",

        position: "Үгийн эхэнд",

        title:
            "Үгийн эхэнд ордог и-г бичээрэй",

        keyboard:
            "I + Shift + 2",

        direction:
            "↘ Эндээс эхлээд доош чиглэлээр бичнэ"
    },


    /* =================================================
       17
    ================================================= */

    {
        glyph: middle(LETTERS.I),

        vowel: "и",

        position: "Үгийн дунд",

        title:
            "Үгийн дунд ордог и-г бичээрэй",

        keyboard:
            "/ + I + /",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       18
    ================================================= */

    {
        glyph: ending(LETTERS.I),

        vowel: "и",

        position: "Үгийн адагт",

        title:
            "Үгийн адагт ордог и-г бичээрэй",

        keyboard:
            "/ + I",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       19
    ================================================= */

    {
        glyph: newLesson1(),

        vowel: "а",

        position: "Холбоо үсэг",

        title:
            "Энэ а-г зөв дарааллаар бичээрэй",

        keyboard:
            "A + / + / + A + / + / + A + A + Shift 1",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       20
    ================================================= */

    {
        glyph: newLesson2(),

        vowel: "э",

        position: "Холбоо үсэг",

        title:
            "Энэ э-г зөв дарааллаар бичээрэй",

        keyboard:
            "E + / + / + E + / + / + E + E + Shift 1",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       21
    ================================================= */

    {
        glyph: newLesson3(),

        vowel: "у",

        position: "Холбоо үсэг",

        title:
            "Энэ у-г зөв дарааллаар бичээрэй",

        keyboard:
            "U + / + / + A + / + / + U + A + Shift 1",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    },


    /* =================================================
       22
    ================================================= */

    {
        glyph: newLesson4(),

        vowel: "ү",

        position: "Холбоо үсэг",

        title:
            "Энэ ү-г зөв дарааллаар бичээрэй",

        keyboard:
            "V + / + / + E + / + / + V + E + Shift 1",

        direction:
            "↘ Дээрээс доош чиглэлээр бичнэ"
    }

];


/* =====================================================
   LAST 4 LAYOUT
===================================================== */

function updateLessonLayout() {

    if (currentLesson >= 18) {

        lessonCard.classList.add(
            "long-lesson"
        );

    } else {

        lessonCard.classList.remove(
            "long-lesson"
        );
    }
}


/* =====================================================
   CANVAS SIZE
===================================================== */

function resizeCanvas() {

    const rect =
        writingArea.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        Math.round(
            rect.width * dpr
        );

    canvas.height =
        Math.round(
            rect.height * dpr
        );


    canvas.style.width =
        rect.width + "px";

    canvas.style.height =
        rect.height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    ctx.lineCap =
        "round";

    ctx.lineJoin =
        "round";

    ctx.lineWidth =
        7;

    ctx.strokeStyle =
        "#58cc02";
}


/* =====================================================
   SHOW LESSON
===================================================== */

function showLesson() {

    const lesson =
        lessons[currentLesson];


    updateLessonLayout();


    progress.textContent =
        `${currentLesson + 1} / ${lessons.length}`;


    /*
       FVS1-ийг display дээрээс нууж,
       ! / дөрвөлжин гаргахгүй.
    */

    const safeGlyph =
        displayGlyph(
            lesson.glyph
        );


    guideCharacter.textContent =
        safeGlyph;

    guide.textContent =
        safeGlyph;


    lessonTitle.textContent =
        lesson.title;


    position.textContent =
        lesson.position;


    message.className = "";


    message.textContent =
        `${lesson.direction} · үзэг салгахгүй · 45° налуу`;


    clearCanvas();


    /* PREVIOUS */

    if (currentLesson === 0) {

        backButton.disabled =
            true;

        backButton.style.opacity =
            "0.45";

    } else {

        backButton.disabled =
            false;

        backButton.style.opacity =
            "1";
    }


    /* NEXT */

    if (
        currentLesson ===
        lessons.length - 1
    ) {

        nextButton.textContent =
            "✓";

    } else {

        nextButton.textContent =
            "→";
    }


    /*
       Layout бүрэн шинэчлэгдсэний дараа
       canvas-ийн хэмжээг дахин авна.
    */

    requestAnimationFrame(
        function () {

            resizeCanvas();

        }
    );
}


/* =====================================================
   CLEAR CANVAS
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


    message.className = "";


    const lesson =
        lessons[currentLesson];


    message.textContent =
        `${lesson.direction} · үзэг салгахгүй · 45° налуу`;
}


/* =====================================================
   POINTER POSITION
===================================================== */

function getPoint(event) {

    const rect =
        canvas.getBoundingClientRect();


    return {

        x:
            event.clientX -
            rect.left,

        y:
            event.clientY -
            rect.top

    };
}


/* =====================================================
   POINTER DOWN
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


        points = [
            point
        ];


        ctx.beginPath();


        ctx.moveTo(
            point.x,
            point.y
        );

    }
);


/* =====================================================
   POINTER MOVE
===================================================== */

canvas.addEventListener(
    "pointermove",
    function (event) {

        if (!drawing) return;


        event.preventDefault();


        const point =
            getPoint(event);


        points.push(
            point
        );


        ctx.lineTo(
            point.x,
            point.y
        );


        ctx.stroke();

    }
);


/* =====================================================
   STOP DRAWING
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

        showWrong(
            "Дахин оролдоорой"
        );

        return;
    }


    /* TOTAL LENGTH */

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

        showWrong(
            "Дахин оролдоорой"
        );

        return;
    }


    /* BOUNDING BOX */

    let minX = Infinity;

    let maxX = -Infinity;

    let minY = Infinity;

    let maxY = -Infinity;


    for (const point of points) {

        minX =
            Math.min(
                minX,
                point.x
            );


        maxX =
            Math.max(
                maxX,
                point.x
            );


        minY =
            Math.min(
                minY,
                point.y
            );


        maxY =
            Math.max(
                maxY,
                point.y
            );
    }


    const width =
        maxX - minX;


    const height =
        maxY - minY;


    if (
        width < 20 &&
        height < 20
    ) {

        showWrong(
            "Дахин оролдоорой"
        );

        return;
    }


    /*
       Хэт хэвтээ зураас
    */

    if (
        width > height * 4 &&
        width > 140
    ) {

        showWrong(
            "Дахин оролдоорой"
        );

        return;
    }


    const first =
        points[0];


    const last =
        points[
            points.length - 1
        ];


    const verticalMovement =
        Math.abs(
            last.y -
            first.y
        );


    const horizontalMovement =
        Math.abs(
            last.x -
            first.x
        );


    /*
       Маш их хэвтээ хөдөлгөөн
    */

    if (
        horizontalMovement >
            verticalMovement * 5 &&
        horizontalMovement > 150
    ) {

        showWrong(
            "Дахин оролдоорой"
        );

        return;
    }


    showCorrect();
}


/* =====================================================
   CORRECT
===================================================== */

function showCorrect() {

    message.className =
        "correct";

    message.textContent =
        "Сайн байна! ✓";
}


/* =====================================================
   WRONG
===================================================== */

function showWrong(text) {

    message.className =
        "wrong";

    message.textContent =
        text;
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

        if (
            currentLesson > 0
        ) {

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
   WINDOW RESIZE
===================================================== */

window.addEventListener(
    "resize",
    function () {

        resizeCanvas();

    }
);


/* =====================================================
   ORIENTATION CHANGE
===================================================== */

window.addEventListener(
    "orientationchange",
    function () {

        setTimeout(
            resizeCanvas,
            100
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
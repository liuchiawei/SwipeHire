<?php

require_once __DIR__ . '/class/CardData.php';

$cardData = new CardData();
$cards = $cardData->getAll();

?>

<html>
<?php include "include/head.php" ?>

<body>
    <div class="wrapper mx-auto">
        <div id="cardContainer" class="card-container relative bg-gray-300 w-full h-full">
            <?php foreach ($cards as $card) : ?>
                <div id="card<?php echo $card->id ?>" class="card w-64 h-96 bg-white rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                    <div class="card-text">
                        <div class="card-title bg-blue-500 w-full h-1/2 flex flex-col justify-end p-4 text-white">
                            <h2 class="text-xl font-bold"><?php echo $card->companyName ?></h2>
                            <p class="text-md"><?=$card->jobTypeDetail ?></p>
                        </div>
                        <div class="card-info p-4">
                            <p class="text-sm"><?php echo $card->businessDetail ?></p>
                            <p class="text-sm">勤務形態　<?php echo $card->workingType ?></p>
                            <p class="text-sm">年収￥<?php echo $card->salaryYMin . "~" . $card->salaryYMax ?></p>
                            <p class="text-sm">勤務場所　<?php echo $card->workingPlace ?></p>
                            <p class="text-sm">勤務時間　<?php echo $card->workingTime ?></p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="swipe-btn-set absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <button id="leftButton" class="swipe-btn Left">&times;</button>
            <button id="rightButton" class="swipe-btn Right">
                <div class="btn_icon star">
                    <img src="image/star.svg" alt="気になる">
                </div>
            </button>
        </div>
    </div>
    <!-- Refresh Button -->
    <button id="refreshButton" class="refresh-btn absolute bottom-4 right-4">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8ebeb">
            <path
                d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z" />
        </svg>
    </button>

    <!-- Dialog Box -->
    <div id="dialog" class="dialog hidden">
        <div class="dialog-content">
            <div class="close-btn" id="close-btn"></div>
            <div class="dialog-img" id="dialog-img"></div>
            <div class="dialog-title">
                <h2 class="dialog-name" id="dialog-name"></h2>
                <p class="dialog-info" id="dialog-location"></p>
                <p class="dialog-info" id="dialog-ageheight"></p>
            </div>
            <p class="dialog-crime" id="dialog-crime"></p>
            <p class="dialog-description" id="dialog-description"></p>
            <button id="contact-button" class="contact-btn">応募</button>
        </div>
    </div>
    </div>
    <script src="js/app.js"></script>
</body>

</html>
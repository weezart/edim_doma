<?php
/**
 * Подключает выбранную иконку из SVG спрайта, сгенерированного из содержимого src/img/icons/ в разметку.
 *
 * @var string $icon Имя файла-иконки.
 */
?>
<svg class="icon icon--<?= $icon; ?>">
    <use xlink:href="/img/sprite.svg#<?= $icon; ?>"></use>
</svg>

<style lang="scss">
    $color: rgba(#464c5b, 0.9);
    .sunset-pop {
        position: absolute;
        right: -20px;
        top: 10px;
        font-size: 12px;
    }
    
    .sunset-pop-wrap {
        position: absolute;
        z-index: 9999;
        padding: 5px 8px;
        background: $color;
        border: 1px solid $color;
        color: #FFF;
        border-radius: 3px;
        font-size: 12px;
        &:before {
            position: absolute;
            right: 20px;
            content: '';
            width: 0px;
            height: 0px;
            border-style: solid;
            border-width: 8px 6px;
        }
        &:before {
            bottom: -17px;
            border-color: $color transparent transparent transparent;
        }
    }
</style>
<template>
</template>
<script>
    $('body').on('mouseenter', '.sunset-pop', function () {
        var $this = $(this),
            popData = $this.attr('data-content') || 'POP';
        var $pop = $('.sunset-pop-wrap');
        if (!$pop.length) {
            $pop = $('<div class="sunset-pop-wrap">' + popData + '</div>');
        } else {
            $pop.html(popData);
        }
        $pop.appendTo($('body')).show();
        var offset = $this.offset();
        $pop.css({
            left: offset.left - $pop.width() + 16,
            top: offset.top - 40
        });
    });
    $('body').on('mouseleave', '.sunset-pop', function () {
        $('.sunset-pop-wrap').hide();
    });
</script>
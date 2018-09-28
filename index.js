var cells = initEmptyCells(25);

$(document).ready(function () {

    var interval;
    makeInputs(cells);

    $('#submit').on('click', function () {
        clearInterval(interval);
        interval = setInterval(function () {
            bringLifeToLife(cells);
        }, 500);
    });
    $('#stop').on('click', function () {
        clearInterval(interval);
    });
});

function makeInputs(c) {
    var form = $("#lifeGround");
    $("#lifeGround")[0].innerHTML = '';
    for (var y = 0; y < c.length; y++) {
        var container = document.createElement('div');
        for (var x = 0; x < c[y].length; x++) {
            var cell = document.createElement('label');
            var dot = document.createElement('div');
            var input = document.createElement('input');
            cell.for = y + ',' + x;
            input.type = 'checkbox';
            input.name = y + ',' + x;
            input.checked = !!c[y][x];
            input.addEventListener('change', toggleLIfeLikeAGod);
            cell.append(input);
            cell.append(dot);
            container.append(cell);
        }
        form.append(container);
    }
}
function toggleLIfeLikeAGod(e){
    var address = e.target.name.split(',');
    cells[parseInt(address[0])][parseInt(address[1])] = e.target.checked;
}
function updateLifeState(c) {
    var oldState = cells.slice(0);
    cells = c;
    for (var y = 0; y < c.length; y++) {
        for (var x = 0; x < c[y].length; x++) {
            if(oldState[y][x] != c[y][x]){
                name = y + "," + x;
                cell = $("[name='"+ name + "']")[0];
                if(cell){
                    cell.checked = !!c[y][x];
                }
            }
        }
    }
}
function initEmptyCells(dimension) {
    var result = [];
    for (var y = 0; y < dimension; y++) {
        result[y] = new Array(dimension);
    }
    return result;
}

function bringLifeToLife(c) {
    $.post('script.php', { "cells": JSON.stringify(c) }
    ).done(function (e) {
        updateLifeState(e);
    });

}
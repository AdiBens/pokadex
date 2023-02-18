"use strict";

let pokemon = [];
$.ajax({
  url: "https://pokeapi.co/api/v2/pokemon?limit=1300",

  success: (data) => {
    data.results.forEach((element) => {
      pokemon.push(element.name);
    });
  },
});

$(function () {
  $("#tags").autocomplete({
    max: 10,
    minLength: 2,
    source: pokemon,
    select: function (event, ui) {
      // console.log(ui.item.value);
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${ui.item.value}`,
        beforeSend: function () {
          $(".hide").show();
          $(".card-img-top").hide();
        },
        complete: function () {
          $(".card-img-top").show();
          $(".hide").hide();
        },
        success: (data) => {
          $(".move").html("");
          data.moves.forEach((item) => {
            $(".move").append(`<li>${item.move.name}</li>`);
          });
          $(".card-title").html(`<h1>${data.name}</h1>`);
          let weight = data.weight.toString();
          weight = weight.slice(0, -1);
          $(".height").html(`<b>Height</b>: ${data.height}cm`);
          $(".weight").html(`<b>Weight</b>: ${weight}kg`);
          $(".card-text").text("");
          data.stats.forEach((stat) => {
            $(".card-text").append(
              `<b>${stat.stat.name}: </b> ${stat.base_stat} <br>`
            );
          });

          $.ajax({
            url: `${data.forms[0].url}`,

            success: (data) => {
              $(".card-img-top").attr("src", data.sprites.front_default);
            },
          });
        },
      });
    },
  });
});

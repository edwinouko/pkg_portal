	// Local Storage for Demographic Info
    $(document).ready (function () {
      $("*[data-store]").each(function () {
        $(this).val(localStorage.getItem("item-" + $(this).attr("data-store")));
      });

      $("*[data-store]").on("keyup", function (itm) {
        localStorage.setItem ("item-" + $(this).attr("data-store"), $(this).val());
      })
    })
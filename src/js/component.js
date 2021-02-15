$(document).ready(function () {
  $(window).scroll(function () {
    return $('.nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });

  if ($(window).scrollTop() > 0) {
    $('.nav').addClass('fixed');
  }

  $('.scroll').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 80
    }, 1500);

  });



  $('.projects-item .img span').each(function () {

    $(this).find('img').css({
      'background': $(this).data('bg_color_img'),
    })

  })

  $('.projects-content, .our_job-item').click(function () {
    window.open($(this).find('.link').attr('href'));
  })


function kitcut( text, limit) {
  text = text.trim();
  if( text.length <= limit) return text;
  text = text.slice( 0, limit); // тупо отрезать по лимиту
  lastSpace = text.lastIndexOf(" ");
  if( lastSpace > 0) { // нашлась граница слов, ещё укорачиваем
    text = text.substr(0, lastSpace);
  }
  return text;
}

  var ViewModel = function () {
    var self = this;
    var filesUploaded = ko.observableArray([]);

    function addFileToList(file) {
      $('#filedrag, .filedrag-title').hide();
      filesUploaded.push(new File(file));

      $('.upload-results').css({
        'margin-top': '26px',
        'margin-bottom': '44px'
      })
    }

    function File(newFile) {
      var self = this;
      construct(newFile);

      function construct(file) {
        self.name = kitcut(file.name.split('.')[0], 30);
        self.type = file.type;
        self.size = file.size;
        self.icon = setIconBasedOnFileType(file.type);
      }

      function setIconBasedOnFileType(fileType) {
        switch (fileType) {
          case 'text/plain':
            return "fa-file-text-o";
          case 'application/pdf':
            return "fa-file-pdf-o";
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return "fa-file-word-o";
          default:
            return "fa-file-o";
        }
      }
    }

    return {
      filesUploaded: filesUploaded,
      addFileToList: addFileToList
    };
  }

  var vm = new ViewModel();

  ko.applyBindings(vm);

  // getElementById
  function $id(id) {
    return document.getElementById(id);
  }

  //
  // output information
  function Output(msg) {
    var m = $id("messages");
    m.innerHTML = msg + m.innerHTML;
  }

  // call initialization file
  if (window.File && window.FileList && window.FileReader) {
    Init();
  }

  //
  // initialize
  function Init() {

    var fileselect = $id("fileselect"),
      filedrag = $id("filedrag"),
      submitbutton = $id("submitbutton");

    // file select
    fileselect.addEventListener("change", FileSelectHandler, false);

    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {

      // file drop
      filedrag.addEventListener("dragover", FileDragHover, false);
      filedrag.addEventListener("dragleave", FileDragHover, false);
      filedrag.addEventListener("drop", FileSelectHandler, false);
      //filedrag.style.display = "block";

      // remove submit button
      //    submitbutton.style.display = "none";

    }

  }

  // file drag hover
  function FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover file" : "file");
  }

  // file selection
  function FileSelectHandler(e) {
    // cancel event and hover styling
    FileDragHover(e);

    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    // process all File objects
    for (var i = 0, f; f = files[i]; i++) {
      //ParseFile(f);
      vm.addFileToList(f);
    }

  }

  function ParseFile(file) {

    Output(
      "<span><span>" + file.name +
      //		"</span> type: <span>" + file.type +
      "</span></span> <span style=\"margin-left: 5px; margin-right: 5px;\"> <span>" + file.size +
      "</span> B</span>"
    );

  }




  function initMap() {
    var element = document.getElementById('map');
    if ($(window).width() > 1200) {
      var options = {
        zoom: 17,
        center: {
          lat: 21.1902353,
          lng: -101.7140773
        },
        styles: [
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e9e9e9"
            },
              {
                "lightness": 17
            }
        ]
    },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
            },
              {
                "lightness": 20
            }
        ]
    },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
            },
              {
                "lightness": 17
            }
        ]
    },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#ffffff"
            },
              {
                "lightness": 29
            },
              {
                "weight": 0.2
            }
        ]
    },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
            },
              {
                "lightness": 18
            }
        ]
    },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
            },
              {
                "lightness": 16
            }
        ]
    },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
            },
              {
                "lightness": 21
            }
        ]
    },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dedede"
            },
              {
                "lightness": 21
            }
        ]
    },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "on"
            },
              {
                "color": "#ffffff"
            },
              {
                "lightness": 16
            }
        ]
    },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "saturation": 36
            },
              {
                "color": "#333333"
            },
              {
                "lightness": 40
            }
        ]
    },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
            }
        ]
    },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f2f2f2"
            },
              {
                "lightness": 19
            }
        ]
    },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#fefefe"
            },
              {
                "lightness": 20
            }
        ]
    },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#fefefe"
            },
              {
                "lightness": 17
            },
              {
                "weight": 1.2
            }
        ]
    }
]
      };
    } else {
      var options = {
        zoom: 19,
        center: {
          lat: 21.1909281,
          lng: -101.7193881
        },
        styles: [
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e9e9e9"
            },
              {
                "lightness": 17
            }
        ]
    },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
            },
              {
                "lightness": 20
            }
        ]
    },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
            },
              {
                "lightness": 17
            }
        ]
    },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#ffffff"
            },
              {
                "lightness": 29
            },
              {
                "weight": 0.2
            }
        ]
    },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
            },
              {
                "lightness": 18
            }
        ]
    },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
            },
              {
                "lightness": 16
            }
        ]
    },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
            },
              {
                "lightness": 21
            }
        ]
    },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dedede"
            },
              {
                "lightness": 21
            }
        ]
    },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "on"
            },
              {
                "color": "#ffffff"
            },
              {
                "lightness": 16
            }
        ]
    },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "saturation": 36
            },
              {
                "color": "#333333"
            },
              {
                "lightness": 40
            }
        ]
    },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
            }
        ]
    },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f2f2f2"
            },
              {
                "lightness": 19
            }
        ]
    },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#fefefe"
            },
              {
                "lightness": 20
            }
        ]
    },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#fefefe"
            },
              {
                "lightness": 17
            },
              {
                "weight": 1.2
            }
        ]
    }
]
      };

    }



    var myMap = new google.maps.Map(element, options);

    var markers = [

      {
        coordinates: {
          lat: 21.1909281,
          lng: -101.7193881
        },
        info: '<h6>Our Team</h6> <p>Stop by for coffee :)</p>'
                    }];


    for (var i = 0; i < markers.length; i++) {
      addMarker(markers[i]);
    }

    function addMarker(properties) {
      var marker = new google.maps.Marker({
        position: properties.coordinates,
        icon: 'images/point.svg',
        visible: true,
        map: myMap
      });

      if (properties.image) {
        marker.setIcon(properties.image);
      }

      if (properties.info) {

        if ($(window).width() > 1200) {
          var InfoWindow = new google.maps.InfoWindow({
            content: properties.info,
            pixelOffset: new google.maps.Size(180, 140),
          });
        } else {
          var InfoWindow = new google.maps.InfoWindow({
            content: properties.info,
            pixelOffset: new google.maps.Size(120, 140),
          });
        }

        $(window).resize(function () {

          if ($(window).width() > 1200) {
            var InfoWindow = new google.maps.InfoWindow({
              content: properties.info,
              pixelOffset: new google.maps.Size(180, 140),
            });
          } else {
            var InfoWindow = new google.maps.InfoWindow({
              content: properties.info,
              pixelOffset: new google.maps.Size(120, 140),
            });
          }
        })

        /*  marker.addListener('click', function () {
            InfoWindow.open(myMap, marker);
          });*/
        InfoWindow.open(myMap, marker);

      }


      function jump_to_marker(markerPosition) {
        myMap.panTo(markerPosition);
        myMap.setZoom(17);
        marker.setAnimation(google.maps.Animation.DROP);
      }



    }

  }


  if ($('div').hasClass('map')) {
    initMap();
  }


  $('#nav-icon').click(function () {
    $(this).toggleClass('open');
    $(this).parents('nav').toggleClass('open');
    //    $('nav .menu').toggleClass('open');
  });

  var itemProject = $('.projects .mob-hide').html();
  var itemTeam = $('.team .mob-hide').html();
  var countResize = 0;

  
  if ($(window).width() < 1200) {
    $('.mob-hide').remove();

    $('.mob-slider').slick({
      dots: false,
      arrows: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      centerMode: false,
      variableWidth: true
    });

    $('.menu a').click(function () {
      $('#nav-icon, .nav, .menu').removeClass('open');
    })
  } else {
    $('.projects-item .title').each(function () {
      if ($(this).height() < 144) {
        $(this).parents('.projects-item ').find('.img').css({
          'height': '438px',
        })
      }
    })
  }


  $(window).resize(function () {
    if ($('div').hasClass('map')) {
      initMap();
    }
    
    if ($(window).width() < 1200) {
      
//      itemProject = $('.projects .mob-hide').html();
      
      $('.mob-hide').remove();

      $('.mob-slider').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true
      });
      
      countResize = 0;
      
    } else {
      if(countResize == 0 && !$('.col-xl-4').hasClass('mob-hide')) {
        $('.projects .append_next').after('<div class="col-xl-4 mob-hide">'+itemProject+'</div>');
        $('.team .append_next').before('<div class="col-xl-4 mob-hide">'+itemTeam+'</div>');

        $('.mob-slider').filter('.slick-initialized').slick('unslick');
      }
      
      countResize++;
      /*$('.projects-item .title').each(function () {
        if ($(this).height() < 144) {
          $(this).parents('.projects-item ').find('.img').css({
            'height': '438px',
          })
        }
      })*/
    }
  });

});
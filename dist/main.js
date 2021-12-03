/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// game.js\n// board.js\n// player.js\n// square.js\n// property.js extends square\n// moveTile.js extends square\n// deck.js\n// card.js\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var tavernSquare = document.getElementById('sq-0');\n  var tavernText = tavernSquare.getElementsByTagName('p');\n\n  tavernSquare.onclick = function () {\n    console.log('In tavernSquare onclick');\n    tavernText.innerText = 'Hello!';\n  };\n\n  var rect = tavernSquare.getBoundingClientRect();\n  console.log(rect.top, rect.right, rect.bottom, rect.left);\n  var playerPos = 0;\n  var player = document.getElementById('sq-3').children[0];\n  console.log(player);\n  player.style.transform = 'translate(100px, 200px)';\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNhbm9wb2x5Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwidGF2ZXJuU3F1YXJlIiwiZ2V0RWxlbWVudEJ5SWQiLCJ0YXZlcm5UZXh0IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJvbmNsaWNrIiwiY29uc29sZSIsImxvZyIsImlubmVyVGV4dCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJwbGF5ZXJQb3MiLCJwbGF5ZXIiLCJjaGlsZHJlbiIsInN0eWxlIiwidHJhbnNmb3JtIl0sIm1hcHBpbmdzIjoiQUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0FBLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaEQsTUFBTUMsWUFBWSxHQUFHRixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBckI7QUFDQSxNQUFNQyxVQUFVLEdBQUdGLFlBQVksQ0FBQ0csb0JBQWIsQ0FBa0MsR0FBbEMsQ0FBbkI7O0FBRUFILEVBQUFBLFlBQVksQ0FBQ0ksT0FBYixHQUF1QixZQUFXO0FBQzlCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWjtBQUNBSixJQUFBQSxVQUFVLENBQUNLLFNBQVgsR0FBdUIsUUFBdkI7QUFDSCxHQUhEOztBQUtBLE1BQU1DLElBQUksR0FBR1IsWUFBWSxDQUFDUyxxQkFBYixFQUFiO0FBQ0FKLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRSxJQUFJLENBQUNFLEdBQWpCLEVBQXNCRixJQUFJLENBQUNHLEtBQTNCLEVBQWtDSCxJQUFJLENBQUNJLE1BQXZDLEVBQStDSixJQUFJLENBQUNLLElBQXBEO0FBRUEsTUFBSUMsU0FBUyxHQUFHLENBQWhCO0FBQ0EsTUFBTUMsTUFBTSxHQUFHakIsUUFBUSxDQUFDRyxjQUFULENBQXdCLE1BQXhCLEVBQWdDZSxRQUFoQyxDQUF5QyxDQUF6QyxDQUFmO0FBQ0FYLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUyxNQUFaO0FBRUFBLEVBQUFBLE1BQU0sQ0FBQ0UsS0FBUCxDQUFhQyxTQUFiLEdBQXlCLHlCQUF6QjtBQUNILENBakJEIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIGdhbWUuanNcclxuLy8gYm9hcmQuanNcclxuXHJcbi8vIHBsYXllci5qc1xyXG4vLyBzcXVhcmUuanNcclxuLy8gcHJvcGVydHkuanMgZXh0ZW5kcyBzcXVhcmVcclxuLy8gbW92ZVRpbGUuanMgZXh0ZW5kcyBzcXVhcmVcclxuLy8gZGVjay5qc1xyXG4vLyBjYXJkLmpzXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgdGF2ZXJuU3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NxLTAnKTtcclxuICAgIGNvbnN0IHRhdmVyblRleHQgPSB0YXZlcm5TcXVhcmUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3AnKTtcclxuXHJcbiAgICB0YXZlcm5TcXVhcmUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdJbiB0YXZlcm5TcXVhcmUgb25jbGljaycpXHJcbiAgICAgICAgdGF2ZXJuVGV4dC5pbm5lclRleHQgPSAnSGVsbG8hJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZWN0ID0gdGF2ZXJuU3F1YXJlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc29sZS5sb2cocmVjdC50b3AsIHJlY3QucmlnaHQsIHJlY3QuYm90dG9tLCByZWN0LmxlZnQpO1xyXG5cclxuICAgIGxldCBwbGF5ZXJQb3MgPSAwO1xyXG4gICAgY29uc3QgcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NxLTMnKS5jaGlsZHJlblswXTtcclxuICAgIGNvbnNvbGUubG9nKHBsYXllcik7XHJcblxyXG4gICAgcGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMTAwcHgsIDIwMHB4KSc7XHJcbn0pOyJdLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNhbm9wb2x5Ly4vc3JjL2luZGV4LnNjc3M/OTc0NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
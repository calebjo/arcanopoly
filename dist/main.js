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

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  // when the plus symbol is clicked, a new player is created\n  var startingGold = 1000;\n  var player1 = new Player(startingGold, 1, 'Jim', 'placeholder');\n  var player2 = new Player(startingGold, 2, 'Asjdalasdsesfgo', 'placeholder');\n  var player3 = new Player(startingGold, 3, 'Blue Dog', 'placeholder');\n  var players = [player1, player2, player3];\n  var thisGame = new Game(players, startingGold); // until game is won, loop through each player and playTurn \n\n  while (!thisGame.isWon()) {\n    thisGame.playTurn();\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNhbm9wb2x5Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRpbmdHb2xkIiwicGxheWVyMSIsIlBsYXllciIsInBsYXllcjIiLCJwbGF5ZXIzIiwicGxheWVycyIsInRoaXNHYW1lIiwiR2FtZSIsImlzV29uIiwicGxheVR1cm4iXSwibWFwcGluZ3MiOiJBQUFBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBRWhEO0FBQ0EsTUFBSUMsWUFBWSxHQUFHLElBQW5CO0FBRUEsTUFBSUMsT0FBTyxHQUFHLElBQUlDLE1BQUosQ0FBV0YsWUFBWCxFQUF5QixDQUF6QixFQUE0QixLQUE1QixFQUFtQyxhQUFuQyxDQUFkO0FBQ0EsTUFBSUcsT0FBTyxHQUFHLElBQUlELE1BQUosQ0FBV0YsWUFBWCxFQUF5QixDQUF6QixFQUE0QixpQkFBNUIsRUFBK0MsYUFBL0MsQ0FBZDtBQUNBLE1BQUlJLE9BQU8sR0FBRyxJQUFJRixNQUFKLENBQVdGLFlBQVgsRUFBeUIsQ0FBekIsRUFBNEIsVUFBNUIsRUFBd0MsYUFBeEMsQ0FBZDtBQUNBLE1BQU1LLE9BQU8sR0FBRyxDQUFDSixPQUFELEVBQVVFLE9BQVYsRUFBbUJDLE9BQW5CLENBQWhCO0FBRUEsTUFBSUUsUUFBUSxHQUFHLElBQUlDLElBQUosQ0FBU0YsT0FBVCxFQUFrQkwsWUFBbEIsQ0FBZixDQVZnRCxDQVloRDs7QUFDQSxTQUFPLENBQUNNLFFBQVEsQ0FBQ0UsS0FBVCxFQUFSLEVBQTBCO0FBRXRCRixJQUFBQSxRQUFRLENBQUNHLFFBQVQ7QUFDSDtBQUNKLENBakJEIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgXHJcbiAgICAvLyB3aGVuIHRoZSBwbHVzIHN5bWJvbCBpcyBjbGlja2VkLCBhIG5ldyBwbGF5ZXIgaXMgY3JlYXRlZFxyXG4gICAgbGV0IHN0YXJ0aW5nR29sZCA9IDEwMDA7XHJcblxyXG4gICAgbGV0IHBsYXllcjEgPSBuZXcgUGxheWVyKHN0YXJ0aW5nR29sZCwgMSwgJ0ppbScsICdwbGFjZWhvbGRlcicpO1xyXG4gICAgbGV0IHBsYXllcjIgPSBuZXcgUGxheWVyKHN0YXJ0aW5nR29sZCwgMiwgJ0FzamRhbGFzZHNlc2ZnbycsICdwbGFjZWhvbGRlcicpO1xyXG4gICAgbGV0IHBsYXllcjMgPSBuZXcgUGxheWVyKHN0YXJ0aW5nR29sZCwgMywgJ0JsdWUgRG9nJywgJ3BsYWNlaG9sZGVyJyk7XHJcbiAgICBjb25zdCBwbGF5ZXJzID0gW3BsYXllcjEsIHBsYXllcjIsIHBsYXllcjNdO1xyXG5cclxuICAgIGxldCB0aGlzR2FtZSA9IG5ldyBHYW1lKHBsYXllcnMsIHN0YXJ0aW5nR29sZCk7XHJcblxyXG4gICAgLy8gdW50aWwgZ2FtZSBpcyB3b24sIGxvb3AgdGhyb3VnaCBlYWNoIHBsYXllciBhbmQgcGxheVR1cm4gXHJcbiAgICB3aGlsZSAoIXRoaXNHYW1lLmlzV29uKCkpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzR2FtZS5wbGF5VHVybigpO1xyXG4gICAgfVxyXG59KTsiXSwiZmlsZSI6Ii4vc3JjL2luZGV4LmpzLmpzIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

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
const math = require('mathjs');
export const compareRegressions = function(userRegCoeffs, modelRegCoeffs, modelPitchData) {
  //endTime and deltaT are derived from the model data so i'll be passing in the modelPitchData and grabbing it from there
  const endTime = modelPitchData[modelPitchData.length - 1]['time'];
  const deltaT = endTime - modelPitchData[modelPitchData.length - 2]['time'];

  const numIntervals = modelPitchData.length - 1;
  const normalizingCoeff = 100 / numIntervals;
  console.log('endTime', endTime, 'deltaT', deltaT, 'numIntervals', numIntervals, 'noraml coeff', normalizingCoeff);

  // have to normalize the score to 100 based off the number of intervals
  // number of intervals = endtime/deltaT
  // scaling coefficient = 100/numIntervals
  //we need the actual functions and then we can use the mathjs library to calculate a derivative
  // we know that the order of the polynomial is = coeffs.length - 1
  let userRegString = '';
  let modelRegString = '';
  for (let i = 0; i < modelRegCoeffs.length; i++) {
    userRegString += userRegCoeffs[i];
    modelRegString += modelRegCoeffs[i];
    let currentOrder = modelRegCoeffs.length - (i+1);
    if ( currentOrder >= 2) {
      userRegString += 'x^' + currentOrder + ' + ';
      modelRegString += 'x^' + currentOrder + ' + ';

    } else if (currentOrder === 1) {
      userRegString += 'x + ';
      modelRegString += 'x + ';
    }
  } 
  console.log('`˚ ∆˚`');
  console.log('user reg coeffs', userRegCoeffs);
  console.log('user reg string', userRegString);
  console.log('model reg coeffs', modelRegCoeffs);
  console.log('model reg string', modelRegString);

  const userRegDeriv = math.derivative(userRegString, 'x');
  const modelRegDeriv = math.derivative(modelRegString, 'x');
  console.log('the result of pluggin 2 in to the deriv of model reg', modelRegDeriv.eval({x: 2}));
  console.log('derivs', userRegDeriv, modelRegDeriv);

  let score = 0;
  modelPitchData.forEach( datum => {
    const userSlope = userRegDeriv.eval({x: datum.time});
    const modelSlope = modelRegDeriv.eval({x: datum.time});
    const diff = Math.abs(userSlope - modelSlope);
    if (diff < 50) {
      score += 1 * normalizingCoeff;
    } else if (diff >= 50 && diff < 100) {
      score += 5 * normalizingCoeff;
    } else if (diff >= 100 && diff < 150) {
      score += 5 * normalizingCoeff;
    }
  });
  return score;

};
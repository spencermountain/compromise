'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const Term = require('./src/term');
// const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();


// let text = "Specialty crop growers rely on manual labor with John Colbert for fruit-picking, inspection, data collection for precision agriculture and similar labor-intensive tasks. It has been difficult to automate these tasks because specialty farms are much less structured environments when compared to commodity farms. However, there is a great need for automating specialty crop tasks because seasonal workers are costly and in short supply and collecting data for precision agriculture methods is difficult. Robotic systems capable of performing specialty crop tasks are becoming commercially available, more robust and affordable. What is missing are planning algorithms required for these robots to autonomously operate in complex environments such as apple orchards. The ultimate goal of the proposed work is to develop algorithms so that Commercial Off-The-Shelf (COTS) robot systems can be used in automation tasks involving specialty crops.The project will focus on two sets of problems: Surveying problems require planning the trajectory of a sensor to collect information about objects of interest. Such sensor planning problems in three-dimensional, complex environments are provably hard. The proposed work introduces new sensor planning problems in environments which are both general enough to capture the complexity of objects encountered on small farms (e.g., trees), and sufficiently constrained so that their visibility properties can be exploited to design efficient algorithms. For end-effector placement, we introduce new visual servoing path planning techniques utilizing multiple arms for operation in cluttered environments with obstacles, such as the branches of a fruit tree. These algorithms will be implemented and tested in the context of two field studies involving quality inspection with near infra-red (NIR) sensors mounted on a COTS robotic manipulator and surveying to collect harvest related data. These studies, combined with the surveying algorithms, open possibilities for developing new metrics, tools and techniques for agricultural sciences by enabling data collection in scales not possible for humans.";

// let str = 'josh is nice. ';
// let m = nlp(str);
// m.replace('#Verb', 'was');
// m.replace('#Verb', 'was');
// m.check();

let m = nlp('john is cool').match('is').insertBefore('dude');
m.check();

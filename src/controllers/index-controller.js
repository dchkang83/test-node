import service from '../services/main-service.js'

// exports.main = async (req, res, next) => {
//   // API로 통신할거라서 이후 작업 안함, 실제 작업할때 작업해야할듯
//   res.send('Hello easypick Node Server!');
// }

// exports.main = async (req, res, next) => {
//   // res.send('Hello easypick Node Server! Controller');
//   // let { boardId } = req.params

//   try {
//     let rows = await service.getTest()
//     // return res.json(rows[0])
//     console.log(rows);

//     res.send('Hello easypick Node Server! Services');
//   } catch (err) {
//     return res.status(500).json(err)
//   }
// }


export default {
  main: async (req, res, next) => {
    // API로 통신할거라서 이후 작업 안함, 실제 작업할때 작업해야할듯
    res.send('Hello easypick Node Server!');
  }
}

export default {
    getTest: async () => {
        try {
            // let data = await pool.query(BoardQuery.getBoard, [boardId])
            // return data[0]

            // 위에껀 RDB 쿼리임, ORM으로 작업해야함.
            // prisma 쓰려고 했는데 일단 패스 api로 할거니깐.
            return []
        } catch (err) {
            console.log(err)
            throw Error(err)
        }
    }
}
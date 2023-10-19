
const main_loader = async (req, res) => {
    try {
        const user=res.locals.user
        // console.log('user:',user)
       if(user!=''){ 
        res.render('index', { message: '',user})
       }
       else{
        res.render('index', { message: '',user:''})
       }
    } catch (error) {
        console.log(`Error in loading landing page${error}`)
        res.status(404).redirect('/404')
    }
}
const about_loader = async (req, res) => {
    try {
        res.render('about')
    } catch (error) {
        console.log(`Error in loading landing page${error}`)
        res.status(404).redirect('/404')
    }
}
// 
const not_found_loader = async (req, res) => {
    try {
        res.render('404')
    } catch (error) {
        console.log(`Error in loading landing page${error}`)
        res.status(404).redirect('/404')
    }
}
module.exports = {
    main_loader,
    about_loader,
    not_found_loader
};
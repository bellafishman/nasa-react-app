export default function Footer(props) {
    /* destructure props passed from App.jsx to get bool and funtion */
    const {handleToggleModal, data} = props

    return (
        <footer>
            <div className="bgGradient"></div>
            <div>
                <h1>Galaxy Explorer</h1>
                <h2>{data?.title}</h2>
            </div>
            <button onClick={handleToggleModal}>
                <i className="fa-solid fa-circle-plus"></i>
            </button>
        </footer>
    )
}
const Button = ({
    buttonStyle
}: {
    buttonStyle: string
}) => {

    return (
        <button className={buttonStyle}>
            This is your button
        </button>
    )
}
export default Button
import styles from './Spinner.module.scss'
import { BounceLoader } from 'react-spinners'

const Spinner = () => {
    return (
        <div className={styles.spinnerWrapper}>
            <BounceLoader color='white'/>
        </div>
    )
}

export default Spinner
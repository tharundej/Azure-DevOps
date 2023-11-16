/* eslint no-use-before-define: 0 */  // --> OFF
import ReusableTabs from '../tabs/ReusableTabs';
import Fuel from './Fuel';
import OtherExpenses from './OtherExpenses';
import Vehicles from './Vehicles';

export default function Expenses() {
	const tabLabels = ["Fuel" , "Vehicles" , "Others"]
	const tabContents = [
        <div> <Fuel /> </div>,
        <div> <Vehicles /> </div>,
        <div> <OtherExpenses /> </div>
    ]

	return (
		<>
			<ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />
		</>
	)
}
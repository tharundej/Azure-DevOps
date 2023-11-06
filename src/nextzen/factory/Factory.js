
import ReusableTabs from '../tabs/ReusableTabs';

import Table from './FactoryTable';

const Factory = () => {
  const tabLabels = ['Factory Details'];
  const tabContents = [
    <div>
      <Table />
    </div>,<div>sss</div>
  ];
  return (
    <>
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />
    </>
  );
};
export default Factory;

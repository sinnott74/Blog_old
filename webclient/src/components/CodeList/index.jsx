import React from 'react';
import Card from '../Card'
import CodeListItem from '../CodeListItem'
// import './style.css'

const CodeList = (props) => {

  let codeItems = props.codeList.map(function(codeListItem){
    return <CodeListItem key={codeListItem.url} name={codeListItem.name} description={codeListItem.description} url={codeListItem.url} />
  });

  return (
    <Card>
      <div className="codelist">
        { codeItems }
      </div>
    </Card>
  );
}

export default CodeList;
export default function FirstPost(props) {
    return (
    <>
    <h1>test 1</h1>
            <h2>{props.id}</h2>
    </>
    );
}

export async function getServerSideProps({params,req,res,query,preview,previewData,resolvedUrl,locale,locales,defaultLocale}) {
    console.log('Logging : exec here '+res);
    return {props: {id:"one"}};
  }
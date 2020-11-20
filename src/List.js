export default function List({ list, index }) {
  
      return (
        <div className="listBox">
            <a href="3"><span>{list.text}</span></a><br />
            <span><a href="">{list.comments} comments</a></span>
        </div>
      );
  }
  
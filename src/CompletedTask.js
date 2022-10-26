import { BsFillArchiveFill, BsCheckCircleFill } from "react-icons/bs";

function CompletedTask({ completedTasks, deleteCompletedTask }) {
    return (
      <>
        <section className="comp-task">
          <h2>Completed Tasks</h2>
          <hr />
          {completedTasks.map((item) => {
            return (
              <view style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                <h3>{item.body}</h3>
                <BsFillArchiveFill
                  className="del-icon"
                  size={35}
                  onClick={() => {
                    deleteCompletedTask(item);
                  }}
                />
              </view>
            );
          })}
        </section>
      </>
    );
  }

  export default CompletedTask;

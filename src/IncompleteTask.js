import { BsFillArchiveFill, BsCheckCircleFill } from "react-icons/bs";
import SearchIcon from "@mui/icons-material/Search";
function IncompleteTask({
    incompletedTasks,
    deleteIncompletedTask,
    markCompleted,
  }) {
    return (
      <>
        <section className="incomp-task">
          <h2>Tasks To Do</h2>
          <hr />
          {incompletedTasks.map((task) => {
            return (
              <>
                <view
                  key={task.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <h3>{task.body}</h3>
                  <BsCheckCircleFill
                    className="comp-icon"
                    size={35}
                    onClick={() => {
                      markCompleted(task);
                    }}
                  />
                  <BsFillArchiveFill
                    className="del-icon"
                    size={35}
                    onClick={() => {
                      deleteIncompletedTask(task);
                    }}
                  />
                </view>
              </>
            );
          })}
        </section>
      </>
    );
  }

  export default IncompleteTask;

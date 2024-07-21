import ClientTopLeftSideBar from "../components/ClientTopLeftSideBar";
import "../styles/ClientSettingsPage.css";

const ClientSettingsPage = () => {
  return (
    <>
      <div className="client-settings-page">
        <ClientTopLeftSideBar />
      </div>
      <div>
        <h1>Settings</h1>
      </div>

    </>
  );
};

export default ClientSettingsPage;

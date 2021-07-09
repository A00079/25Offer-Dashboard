import { Navbar, Footer } from "./components";
import { history } from "../../utils";
import { connect } from "react-redux";

function PublicLayout(props) {
  console.log(props.isOpen);
  const { children, withFooter = true } = props;
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className={`${props.isOpen ? "pl-60" : "pl-20"}  py-16`}>
        {children}
      </div>
      <div>{withFooter && <Footer />}</div>
    </div>
  );
}

const mapDispatchToProps = ({ ui }) => ({
  isOpen: ui.isDrawerOpen,
});

export default connect(mapDispatchToProps)(PublicLayout);

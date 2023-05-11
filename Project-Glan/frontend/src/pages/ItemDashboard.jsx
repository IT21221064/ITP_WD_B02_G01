import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchItemList, RemoveItem } from "../redux/actions/ItemActions";
import Header_bar_inv from "../components/Header_bar/Header_bar_inv";
import "../pages/Content.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const ItemListing = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  let lowquant = 0;
  let totalquant = 0;
  let totalexpens = 0;

  useEffect(() => {
    props.loaditem();
  }, []);

  const handleDelete = (code) => {
    if (window.confirm("Remove item ?")) {
      props.removeitem(code);
      props.loaditem();
      toast.success("Item remove successfully");
    }
  };

  return props.Item.loading ? (
    <div>
      <h2>Loading data...</h2>
    </div>
  ) : props.Item.errmessage ? (
    <div>
      <h2>{props.Item.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div>
        {" "}
        <Header_bar_inv
          fun1="Dashboard"
          fun2="Items"
          fun3="Raw Materials"
          fun4="Damage or Return Products"
          fun5="Suppliers"
          fun6="Report"
        />
      </div>

      <div className="search">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <BiSearchAlt />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>
      <div class="page_sub_header">
        <t class="sub_header_topic">Item Dashboard</t>
        <Link to="/AddItem" className="page_link">
          Create
        </Link>
      </div>

      <div className="Content">
        {props.Item.itemlists &&
          props.Item.itemlists.map((iitem) => (
            <script>
              {iitem.quantity == 0 ? (lowquant = lowquant + 1) : null}
              {iitem.quantity
                ? (totalquant = totalquant + iitem.quantity)
                : null}
              {iitem.quantity && iitem.unitprice
                ? (totalexpens = totalexpens + iitem.quantity * iitem.unitprice)
                : null}
            </script>
          ))}
        <h3>
          <span>Outof Stock Count : {lowquant.toFixed(0)}</span>
        </h3>
        <h3>
          <span>Total Quantity Count : {totalquant.toFixed(0)}</span>
        </h3>
        <h3>
          <span>Total Stock Value : {totalexpens.toFixed(0)}</span>
        </h3>

        <iframe
          style={
            ({ background: "#FFFFFF" },
            { borderradius: "2px" },
            { boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })
          }
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645ba979-9cc7-41f7-86ab-3ce8be56e10a&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>

        <Table striped hover className="table">
          <thead className="theader">
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {props.Item.itemlists &&
              props.Item.itemlists
                .filter(
                  (iitem) =>
                    iitem.itemcode
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    iitem.itemname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((iitem) => (
                  <tr key={iitem._id}>
                    <td>{iitem.itemcode}</td>
                    <td>{iitem.itemname}</td>
                    <td>{iitem.unitprice}</td>
                    <td>{iitem.quantity}</td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    Item: state.Item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loaditem: () => dispatch(FetchItemList()),
    removeitem: (code) => dispatch(RemoveItem(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListing);

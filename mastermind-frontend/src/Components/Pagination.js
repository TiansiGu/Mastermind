import React, { useState, useEffect } from "react";
import { Row, Col, Pagination, Dropdown } from "react-bootstrap";

function PaginationComponent({
  activePage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  select,
}) {
  const [currentPage, setCurrentPage] = useState(0); //control the active display of page option (darker color)
  const [pages, setPages] = useState([]); //an array of int from 1
  const itemsPerPageOptions = [5, 10, 20];

  // Update pages array (determines num of page optional blocks) based on totalItems and itemsPerPage
  useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // console.log("Total items is " + totalItems);
    // console.log("Items per page is " + itemsPerPage);
    // console.log(totalPages + " pages in total");
    const newPages = Array.from({ length: totalPages }, (_, index) => index);
    setPages(newPages);
  }, [totalItems, itemsPerPage]);

  // Make sure when switch between two kinds of records, reset the current active page option to be page 1
  useEffect(() => {
    setCurrentPage(0);
    // console.log("This effect is executed. The current page is " + currentPage);
  }, [select]);

  useEffect(() => {
    setCurrentPage(activePage);
    console.log(
      "This effect is executed, currentPage changed to " + activePage
    );
  }, [activePage]);

  // Function that invokes API call of corresponding data when change page
  const handlePageChange = (page) => {
    setCurrentPage(page); //invoke API call
    onPageChange(page); //update active(darker) page button
  };

  // Function that invokes API call of corresponding data when change size
  const handleItemsPerPageChange = (size) => {
    setCurrentPage(0); // Reset to the first page when changing items per page
    onItemsPerPageChange(size);
  };

  return (
    <Row className="justify-content-center mt-3">
      {/** Records /page selection */}
      <Col md={4} className="d-flex justify-content-center align-items-center">
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            records per page: {itemsPerPage}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {itemsPerPageOptions.map((option) => (
              <Dropdown.Item
                key={option}
                onClick={() => handleItemsPerPageChange(option)}
              >
                {`${option} /page`}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      {/** Page selection */}
      <Col md={8} className="d-flex justify-content-center align-items-center">
        <Pagination>
          {pages.map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Col>
    </Row>
  );
}

export default PaginationComponent;

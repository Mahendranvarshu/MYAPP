import styled from "styled-components";

import Newsletter from "../Components/Newsletter";

import { mobile } from "../responsive";
import Productcatelog from "../Components/Productcatelog";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
     
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Category
            </Option>
            <Option>Smarphone</Option>
            <Option>Labtop</Option>
            <Option>Taplet</Option>
            <Option>Smart watches</Option>
            <Option>earsBuds</Option>
            
          </Select>
          <Select>
            <Option disabled selected>
              Price
            </Option>
            <Option>primeum</Option>
            <Option>Pro</Option>
            <Option>Meadium</Option>
            <Option>Low</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Productcatelog />
      <Newsletter/>
    </Container>
  );
};

export default ProductList;

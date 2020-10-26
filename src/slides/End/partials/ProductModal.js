import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { HbSection } from '../../../visly/Pages'
import { Tabs, Panel, useTabState } from '@bumaga/tabs' 
import { HbCloseModal, HbTabs } from '../../../visly'
import { FlexBox } from "react-styled-flex";

const Close = styled(HbCloseModal)`
  position: absolute;
  top: 0;
  right: 0;
`

const Tab = ({ text }) => {
  const { onClick, isActive } = useTabState();

  return <HbTabs.Button text={text} onClick={onClick} selected={isActive} />
};

const ProductModal = ({hideModal}) => {
  return (
    <ReactModal isOpen onAfterClose={hideModal}>
      <FlexBox justifyContent="center">
        <HbSection style={{ margin: '0 auto' }} withImage imageSrc={'https://www.placecage.com/200/200'}>
          <Tabs>
            <HbTabs>
              <Tab text="Description" />
              <Tab text="Dosing" />
              <Tab text="Nutritional" />
            </HbTabs>

            <Panel><p>Panel 1</p></Panel>
            <Panel><p>Panel 2</p></Panel>
            <Panel><p>panel 3</p></Panel>
          </Tabs>
        </HbSection>

        <Close onClick={hideModal} />
      </FlexBox>
    </ReactModal>
  );
}
 
export default ProductModal;
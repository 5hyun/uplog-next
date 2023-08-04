import { AiOutlinePlus } from 'react-icons/ai';
import React, { useCallback, useState } from 'react';
import { product } from '@/recoil/Product/atom.ts';
import { useRecoilState } from 'recoil';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { BiPencil } from 'react-icons/bi';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDisclosure } from '@chakra-ui/react';
import ProductInfoModal from '@/components/Product/Info/ProductInfoModal.tsx';
import { Scrollbars } from 'rc-scrollbars';

export default function ProductList() {
  // ProductList 정보
  const [productList, setProductList] = useRecoilState(product);

  // 제품추가&정보수정 모달창
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCreateProduct, setIsCreateProduct] = useState(true);

  // 제품 list 클릭해도 꺼지지않게함
  const onChildClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 제품 추가인지 수정인지 체크 여부
  const onChangeIsCreateProduct = useCallback((check: boolean) => {
    setIsCreateProduct(check);
  }, []);

  // dnd - 드래그 끝나면 실행되는 함수
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      // 이상한 곳에 드래그하면 return
      if (!destination) return;

      // 출발지와 도착지가 다르면 재정렬
      if (Array.isArray(productList)) {
        // 깊은 복사
        const updatedProduct = JSON.parse(JSON.stringify(productList)) as typeof productList;
        // 기존 아이템 뽑아내기
        const [movedItem] = updatedProduct.splice(source.index, 1);
        // 기존 아이템을 새로운 위치에 삽입하기
        updatedProduct.splice(destination.index, 0, movedItem);

        // 상태 변경
        setProductList(updatedProduct);
      }
    },
    [productList]
  );

  return (
    <section
      className={
        'border-base w-[20rem] min-h-[3.3rem] max-h-[27.3rem] block absolute top-[4rem] right-[-8.5rem] shadow-sign-up z-40'
      }
      onClick={onChildClick}
    >
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Scrollbars
          autoHeight
          autoHeightMax={'23.7rem'}
          autoHide
          autoHideTimeout={1000}
          // Duration for hide animation in ms.
          autoHideDuration={200}
        >
          {/*제품 list*/}
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={'flex-col-center justify-between w-full'}
              >
                {productList.map((product, index) => {
                  return (
                    <Draggable
                      draggableId={product.draggableId}
                      key={product.draggableId}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex-row-center justify-between w-full h-[4.5rem] hover:bg-hover ${
                            snapshot.isDragging ? 'shadow-2xl shadow-gray-400' : ''
                          }`}
                        >
                          <RxDragHandleDots2
                            className={'flex w-[2.6rem] items-center text-4xl ml-4 fill-gray-light'}
                          />
                          <img
                            src={product.image}
                            alt="userprofile"
                            className={'ml-2 w-[2rem] h-[2rem]'}
                          />
                          <span className={'ml-3 text-xl font-bold w-full'}>{product.name}</span>
                          <BiPencil
                            className={
                              'flex-row-center w-20 text-xl mr-4 fill-gray-light cursor-pointer'
                            }
                            onClick={() => {
                              onOpen();
                              onChangeIsCreateProduct(false);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Scrollbars>
      </DragDropContext>

      {/*제품 추가하기*/}
      <div
        className={
          'flex-row-center justify-between w-full h-[3.3rem] border-solid border-t border-gray-border'
        }
        onClick={() => {
          onOpen();
          onChangeIsCreateProduct(true);
        }}
      >
        <AiOutlinePlus className={'flex items-center text-2xl ml-4 fill-gray-light'} />
        <span className={'flex items-center w-full text-base ml-3 text-gray-light font-medium'}>
          제품 추가하기
        </span>
      </div>
      <ProductInfoModal isOpen={isOpen} onClose={onClose} isCreateProduct={isCreateProduct} />
    </section>
  );
}

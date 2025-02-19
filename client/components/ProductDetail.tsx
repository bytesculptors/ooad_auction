'use client';
import { ProductProps } from '@/types';
import React from 'react';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CustomButton from './CustomButton';
import Link from 'next/link';

interface ProductDetailProps {
    isOpen: boolean;
    closeModal: () => void;
    item: ProductProps;
}

const ProductDetail = ({ isOpen, closeModal, item }: ProductDetailProps) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                                    >
                                        <Image
                                            src="/close.svg"
                                            alt="close"
                                            width={20}
                                            height={20}
                                            className="object-contain"
                                        />
                                    </button>
                                    <div className="flex-1 flex flex-col gap-3">
                                        <div className="relative w-full h-40 bg-pattern bg-cover bg-center">
                                            <Image
                                                src={item.image}
                                                alt="product model"
                                                fill
                                                priority
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <h2 className="font-semibold text-xl capitalize">
                                            {item.name} {item.origin}
                                        </h2>
                                        <div className="mt-3 flex flex-wrap gap-4">
                                            {Object.entries(item).map(([key, value]) => {
                                                if (key !== 'imageUrl') {
                                                    return (
                                                        <div
                                                            className="flex justify-between gap-5 w-full text-right"
                                                            key={key}
                                                        >
                                                            <h4 className="text-gray capitalize">{key}</h4>
                                                            <p className="text-black-100 text-justify font-semibold">
                                                                {value}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                        {/* <CustomButton
                                            title="Apply for auction"
                                            containerStyles="w-full mt-6 py-[16px] rounded-full bg-primary-blue"
                                            textStyles="text-white text-[14px] leading-[17px] font-bold"
                                        /> */}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ProductDetail;

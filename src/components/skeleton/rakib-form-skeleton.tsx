import React from "react";
import { ScrollView } from "react-native";
import SkeletonElement from "./SkeletonElement";

const FormSkeleton = () => {
  return (
    <ScrollView
      className="flex-1 bg-white px-[6%] pt-8"
      showsVerticalScrollIndicator={false}
    >
      <SkeletonElement width="100%" height={50} style={{ marginBottom: 20 }} />
      <SkeletonElement width="100%" height={50} style={{ marginBottom: 20 }} />
      <SkeletonElement width="100%" height={50} style={{ marginBottom: 20 }} />
      <SkeletonElement width="100%" height={50} style={{ marginBottom: 20 }} />
      <SkeletonElement width="100%" height={50} style={{ marginBottom: 20 }} />
      <SkeletonElement width="100%" height={50} style={{ marginBottom: 20 }} />
      <SkeletonElement width="100%" height={50} style={{ marginBottom: 20 }} />
      <SkeletonElement width="100%" height={50} style={{ marginBottom: 20 }} />
      <SkeletonElement width="100%" height={50} />
    </ScrollView>
  );
};

export default FormSkeleton;

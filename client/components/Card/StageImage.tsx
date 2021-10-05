import React from "react";
import { useForm, useWatch } from "react-hook-form";
// import ImageCanvas from '../../ImageCanvas'

// function StageImage({ control }) {
//   const stageImage = useWatch({
//     control,
//     name: 'firstName', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
//     defaultValue: 'default', // default value before the render
//   })

//   return (
//     <ImageCanvas
//       src={`${values.type}-${values.stage}.png`}
//       width={540}
//       height={759}
//     />
//   ) // only re-render at the component level, when firstName changes
// }

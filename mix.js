const b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',]
// const a = [{"url":"https://seesparkbox.com/foundry/bem_by_example","views":"2341","author":{"firstName":"Nathan","lastName":"Rambeck","fullName":"Nathan Rambeck","title":"Developer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/nathan-rambeck.jpg"},"title":"BEM by Example"},{"url":"https://seesparkbox.com/foundry/api_testing_with_postman","views":"2232","author":{"firstName":"Mike","lastName":"Yockey","fullName":"Mike Yockey","title":"Developer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/mike-yockey.jpg"},"title":"API Testing with Postman"},{"url":"https://seesparkbox.com/foundry/how_to_use_ampersands_to_simplifiy_your_sass","views":"1827","author":{"firstName":"Philip","lastName":"Zastrow","fullName":"Philip Zastrow","title":"Frontend Designer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/philip-zastrow.jpg"},"title":"&"},{"url":"https://seesparkbox.com/foundry/react_context_api_state_management","views":"1306","author":{"firstName":"Jon","lastName":"Oliver","fullName":"Jon Oliver","title":"Developer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/jon-oliver.jpg"},"title":"React: Understanding the Context"},{"url":"https://seesparkbox.com/foundry/how_and_why_we_unit_test_our_sass","views":"658","author":{"firstName":"Lindsey","lastName":"Wild","fullName":"Lindsey Wild","title":"Developer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/lindsey-wild.jpg"},"title":"How and Why We Unit Test Our Sass"},{"url":"https://seesparkbox.com/foundry/demystifying_multi_file_searches_in_vim_and_the_command_line","views":"644","author":{"firstName":"Ethan","lastName":"Muller","fullName":"Ethan Muller","title":"Frontend Designer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/ethan-muller.jpg"},"title":"Demystifying Multi-file Searches in Vim (and the command line)"},{"url":"https://seesparkbox.com/foundry/gradle_for_npm_users","views":"371","author":{"firstName":"Daniel","lastName":"Flynn","fullName":"Daniel Flynn","title":"Developer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/daniel-flynn.jpg"},"title":"Gradle for NPM Users"},{"url":"https://seesparkbox.com/foundry/how_i_built_a_canvas_color_picker","views":"352","author":{"firstName":"Rob","lastName":"Tarr","fullName":"Rob Tarr","title":"Developer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/rob-tarr.jpg"},"title":"How I Built a Canvas Color Picker"},{"url":"https://seesparkbox.com/foundry/thoughtful_css_architecture","views":"349","author":{"firstName":"Nathan","lastName":"Rambeck","fullName":"Nathan Rambeck","title":"Developer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/nathan-rambeck.jpg"},"title":"Thoughtful CSS Architecture"},{"url":"https://seesparkbox.com/foundry/validating_the_jquery_ui_datepicker","views":"315","author":{"firstName":"Rob","lastName":"Tarr","fullName":"Rob Tarr","title":"Developer","photo":"https://seesparkbox.com/foundry/uploads/employee_images/rob-tarr.jpg"},"title":"Validating the jQuery UI Datepicker"}]
// const b = [{"message":"I'm gonna mention <strong class=\"name-mention\">Ethan Muller</strong> and <strong class=\"name-mention\">Ether Mulbin</strong>","awesomePerson":"Ethan Muller","author":"Ethan Muller","approver":"Ethan Muller","timestamp":"1536673104"},{"message":"I'm gonna mention <strong class=\"name-mention\">Ethan Muller</strong> and <strong class=\"name-mention\">Ether Mulbin</strong>","awesomePerson":"Ethan Muller","author":"Ethan Muller","approver":"Ethan Muller","timestamp":"1536673104"}]

const mixData = (postAnalyticsData, awesomenessData) => {
  // This mixes our set of data into
  // a nice little salad of happiness
  //
  // It merges the two arrays by alternating through
  // the items, merging them into one list.
  //
  // Right now it only supports mixing two lists.

  const arrA = [...postAnalyticsData]
  const arrB = [...awesomenessData]
  const arrArr = [arrA, arrB]
  const limit = arrArr.reduce((a, b) => a + b.length, 0)
  const mixedData = []

  for (let i = 0; i < limit; i++) {
    const nextItem = arrArr[i % 2].shift()

    if (nextItem) {
      mixedData.push(nextItem)
    } else {
      const nextNextItem = arrArr[(i+1) % 2].shift()
      if (nextNextItem) {
        mixedData.push(nextNextItem)
      }
    }
  }

    console.log(mixedData)
  // return postAnalyticsData
  return mixedData
}

mixData(a, b)
